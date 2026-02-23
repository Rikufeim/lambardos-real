export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  velocity: number;
  rotation: number;
}

export interface Obstacle {
  x: number;
  gapY: number;
  gapHeight: number;
  width: number;
  passed: boolean;
  moving?: { speed: number; min: number; max: number };
  door?: { open: boolean; timer: number; period: number };
}

export interface BonusItem {
  x: number;
  y: number;
  type: 'screw' | 'level' | 'plug';
  collected: boolean;
  radius: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface GameState {
  status: 'menu' | 'playing' | 'gameover' | 'daily';
  player: Player;
  obstacles: Obstacle[];
  bonuses: BonusItem[];
  particles: Particle[];
  score: number;
  combo: number;
  maxCombo: number;
  multiplier: number;
  bestScore: number;
  speed: number;
  baseSpeed: number;
  gravity: number;
  flapForce: number;
  stabilized: number; // frames remaining
  frameCount: number;
  dailySeed: number | null;
  dailyBest: number;
  scrollX: number;
  centerMeter: number; // 0-1 how centered player was in last gap
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
  combo: number;
}
