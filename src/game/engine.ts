import type { GameState, Obstacle, BonusItem, Particle } from './types';
import { createSeededRandom, getDailySeed } from './seededRandom';

const PLAYER_W = 36;
const PLAYER_H = 28;
const OBSTACLE_W = 60;
const BASE_GAP = 140;
const MIN_GAP = 90;
const BASE_SPEED = 2.5;
const GRAVITY = 0.35;
const FLAP = -6;
const STABILIZED_GRAVITY = 0.15;
const SPAWN_INTERVAL = 180; // frames

let rng = Math.random;

export function createInitialState(): GameState {
  const best = parseInt(localStorage.getItem('lambardos_best') || '0', 10);
  const dailyBest = parseInt(localStorage.getItem('lambardos_daily_' + getDailySeed()) || '0', 10);
  return {
    status: 'menu',
    player: { x: 80, y: 200, width: PLAYER_W, height: PLAYER_H, velocity: 0, rotation: 0 },
    obstacles: [],
    bonuses: [],
    particles: [],
    score: 0,
    combo: 0,
    maxCombo: 0,
    multiplier: 1,
    bestScore: best,
    speed: BASE_SPEED,
    baseSpeed: BASE_SPEED,
    gravity: GRAVITY,
    flapForce: FLAP,
    stabilized: 0,
    frameCount: 0,
    dailySeed: null,
    dailyBest: dailyBest,
    scrollX: 0,
    centerMeter: 0,
  };
}

export function startGame(state: GameState, daily = false): GameState {
  const seed = daily ? getDailySeed() : null;
  rng = seed !== null ? createSeededRandom(seed) : Math.random;
  const best = parseInt(localStorage.getItem('lambardos_best') || '0', 10);
  const dailyBest = parseInt(localStorage.getItem('lambardos_daily_' + getDailySeed()) || '0', 10);
  return {
    ...createInitialState(),
    status: 'playing',
    bestScore: best,
    dailySeed: seed,
    dailyBest: dailyBest,
  };
}

export function flap(state: GameState): GameState {
  if (state.status !== 'playing') return state;
  return {
    ...state,
    player: { ...state.player, velocity: state.flapForce },
  };
}

export function tick(state: GameState, canvasW: number, canvasH: number): GameState {
  if (state.status !== 'playing') return state;

  let s = { ...state };
  s.frameCount++;
  s.scrollX += s.speed;

  // Gravity
  const grav = s.stabilized > 0 ? STABILIZED_GRAVITY : s.gravity;
  const newVel = s.player.velocity + grav;
  const newY = s.player.y + newVel;
  const rotation = Math.max(-0.4, Math.min(0.6, newVel * 0.04));
  s.player = { ...s.player, y: newY, velocity: newVel, rotation };

  // Stabilization countdown
  if (s.stabilized > 0) s.stabilized--;

  // Speed increase
  s.speed = s.baseSpeed + s.score * 0.015;
  if (s.speed > 6) s.speed = 6;

  // Gap shrinks with score
  const currentGap = Math.max(MIN_GAP, BASE_GAP - s.score * 0.8);

  // Spawn obstacles (grace period: first obstacle after 90 frames)
  const lastObs = s.obstacles[s.obstacles.length - 1];
  const canSpawn = s.frameCount > 90;
  if (canSpawn && (!lastObs || lastObs.x < canvasW - SPAWN_INTERVAL)) {
    const minGapY = currentGap / 2 + 20;
    const maxGapY = canvasH - currentGap / 2 - 20;
    const gapY = minGapY + rng() * (maxGapY - minGapY) - currentGap / 2;

    const obs: Obstacle = {
      x: canvasW + 20,
      gapY: gapY,
      gapHeight: currentGap,
      width: OBSTACLE_W,
      passed: false,
    };

    // Special obstacles every 10 points
    if (s.score > 0 && s.score % 10 === 0 && rng() > 0.3) {
      obs.moving = {
        speed: (rng() > 0.5 ? 1 : -1) * (0.3 + rng() * 0.4),
        min: 40,
        max: canvasH - currentGap - 40,
      };
    }

    s.obstacles = [...s.obstacles, obs];

    // Bonus item (30% chance)
    if (rng() < 0.3) {
      const types: ('screw' | 'level' | 'plug')[] = ['screw', 'level', 'plug'];
      const bonus: BonusItem = {
        x: obs.x + obs.width / 2,
        y: gapY + currentGap / 2,
        type: types[Math.floor(rng() * 3)],
        collected: false,
        radius: 10,
      };
      s.bonuses = [...s.bonuses, bonus];
    }
  }

  // Move obstacles
  s.obstacles = s.obstacles
    .map((obs) => {
      let o = { ...obs, x: obs.x - s.speed };
      if (o.moving) {
        let newGapY = o.gapY + o.moving.speed;
        if (newGapY < o.moving.min || newGapY + o.gapHeight > canvasH - o.moving.min) {
          o.moving = { ...o.moving, speed: -o.moving.speed };
          newGapY = o.gapY + o.moving.speed;
        }
        o.gapY = newGapY;
      }
      return o;
    })
    .filter((o) => o.x + o.width > -50);

  // Move bonuses
  s.bonuses = s.bonuses
    .map((b) => ({ ...b, x: b.x - s.speed }))
    .filter((b) => b.x > -50);

  // Score & combo
  for (let i = 0; i < s.obstacles.length; i++) {
    const obs = s.obstacles[i];
    if (!obs.passed && obs.x + obs.width < s.player.x) {
      s.obstacles = s.obstacles.map((o, j) => (j === i ? { ...o, passed: true } : o));

      // Precision check
      const centerY = obs.gapY + obs.gapHeight / 2;
      const playerCenter = s.player.y + s.player.height / 2;
      const dist = Math.abs(playerCenter - centerY);
      const precisionZone = obs.gapHeight * 0.125;
      const precision = Math.max(0, 1 - dist / (obs.gapHeight / 2));
      s.centerMeter = precision;

      if (dist < precisionZone) {
        // Perfect center!
        s.combo++;
        s.maxCombo = Math.max(s.maxCombo, s.combo);
        s.multiplier = Math.min(5, 1 + Math.floor(s.combo / 2));
        // Particles
        s.particles = [
          ...s.particles,
          ...createComboParticles(s.player.x + s.player.width, s.player.y + s.player.height / 2),
        ];
      } else {
        s.combo = 0;
        s.multiplier = 1;
      }

      s.score += s.multiplier;
    }
  }

  // Bonus collection
  for (let i = 0; i < s.bonuses.length; i++) {
    const b = s.bonuses[i];
    if (b.collected) continue;
    const dx = (s.player.x + s.player.width / 2) - b.x;
    const dy = (s.player.y + s.player.height / 2) - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.radius + 16) {
      s.bonuses = s.bonuses.map((bb, j) => (j === i ? { ...bb, collected: true } : bb));
      if (b.type === 'level') {
        s.stabilized = 120; // 2 seconds at 60fps
      } else {
        s.score += 5 * s.multiplier;
      }
      s.particles = [
        ...s.particles,
        ...createBonusParticles(b.x, b.y),
      ];
    }
  }

  // Collision detection
  // Bounds
  if (s.player.y < 0 || s.player.y + s.player.height > canvasH) {
    return gameOver(s);
  }

  // Obstacle collision
  for (const obs of s.obstacles) {
    if (
      s.player.x + s.player.width > obs.x &&
      s.player.x < obs.x + obs.width
    ) {
      if (
        s.player.y < obs.gapY ||
        s.player.y + s.player.height > obs.gapY + obs.gapHeight
      ) {
        return gameOver(s);
      }
    }
  }

  // Update particles
  s.particles = s.particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      life: p.life - 1,
    }))
    .filter((p) => p.life > 0);

  return s;
}

function gameOver(state: GameState): GameState {
  const best = Math.max(state.bestScore, state.score);
  localStorage.setItem('lambardos_best', best.toString());

  if (state.dailySeed !== null) {
    const key = 'lambardos_daily_' + state.dailySeed;
    const prev = parseInt(localStorage.getItem(key) || '0', 10);
    if (state.score > prev) localStorage.setItem(key, state.score.toString());
  }

  // Save to leaderboard
  saveToLeaderboard(state.score, state.maxCombo);

  return { ...state, status: 'gameover', bestScore: best };
}

function saveToLeaderboard(score: number, maxCombo: number) {
  try {
    const raw = localStorage.getItem('lambardos_leaderboard');
    const lb = raw ? JSON.parse(raw) : [];
    lb.push({
      name: '',
      score,
      combo: maxCombo,
      date: new Date().toISOString().split('T')[0],
    });
    lb.sort((a: any, b: any) => b.score - a.score);
    localStorage.setItem('lambardos_leaderboard', JSON.stringify(lb.slice(0, 10)));
  } catch {}
}

function createComboParticles(x: number, y: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (Math.PI * 2 * i) / 8;
    particles.push({
      x, y,
      vx: Math.cos(angle) * (1 + Math.random() * 2),
      vy: Math.sin(angle) * (1 + Math.random() * 2),
      life: 20 + Math.random() * 15,
      maxLife: 35,
      color: '#C00000',
      size: 3 + Math.random() * 3,
    });
  }
  return particles;
}

function createBonusParticles(x: number, y: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < 12; i++) {
    const angle = (Math.PI * 2 * i) / 12;
    particles.push({
      x, y,
      vx: Math.cos(angle) * (2 + Math.random() * 3),
      vy: Math.sin(angle) * (2 + Math.random() * 3),
      life: 25 + Math.random() * 15,
      maxLife: 40,
      color: i % 2 === 0 ? '#FFFFFF' : '#C00000',
      size: 2 + Math.random() * 4,
    });
  }
  return particles;
}

export function getLeaderboard() {
  try {
    const raw = localStorage.getItem('lambardos_leaderboard');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
