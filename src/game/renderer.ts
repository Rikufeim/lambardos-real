import type { GameState, Obstacle, BonusItem, Particle } from './types';

const PRIMARY = '#C00000';
const PRIMARY_DARK = '#8B0000';
const BG_DARK = '#0D0D0D';
const BG_MID = '#1A1A1A';
const WHITE = '#FFFFFF';
const GRAY = '#333333';
const GRAY_LIGHT = '#555555';

export function renderGame(
  ctx: CanvasRenderingContext2D,
  state: GameState,
  canvasW: number,
  canvasH: number
) {
  const { player, obstacles, bonuses, particles, score, combo, multiplier, centerMeter, stabilized } = state;

  // Background
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, canvasW, canvasH);

  // Background silhouette (simple kitchen skyline)
  drawBackground(ctx, canvasW, canvasH, state.scrollX);

  // Obstacles (cabinets)
  for (const obs of obstacles) {
    drawObstacle(ctx, obs, canvasW, canvasH, state);
  }

  // Bonus items
  for (const b of bonuses) {
    if (!b.collected) drawBonus(ctx, b, canvasH);
  }

  // Particles
  for (const p of particles) {
    drawParticle(ctx, p);
  }

  // Player
  drawPlayer(ctx, player, stabilized > 0);

  // HUD
  drawHUD(ctx, score, combo, multiplier, centerMeter, canvasW);

  // Stabilization indicator
  if (stabilized > 0) {
    ctx.save();
    ctx.globalAlpha = 0.3 + 0.2 * Math.sin(state.frameCount * 0.2);
    ctx.strokeStyle = PRIMARY;
    ctx.lineWidth = 3;
    ctx.strokeRect(2, 2, canvasW - 4, canvasH - 4);
    ctx.restore();
  }
}

function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number, scrollX: number) {
  ctx.save();
  // Floor
  ctx.fillStyle = BG_MID;
  ctx.fillRect(0, h * 0.88, w, h * 0.12);

  // Floor line
  ctx.strokeStyle = GRAY;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.88);
  ctx.lineTo(w, h * 0.88);
  ctx.stroke();

  // Ceiling line
  ctx.beginPath();
  ctx.moveTo(0, h * 0.04);
  ctx.lineTo(w, h * 0.04);
  ctx.stroke();

  // Background buildings/cabinets silhouette
  ctx.fillStyle = '#151515';
  const offset = (scrollX * 0.2) % 200;
  for (let x = -200 + offset; x < w + 200; x += 120) {
    const bh = 40 + ((x * 7 + 13) % 60);
    ctx.fillRect(x, h * 0.88 - bh, 80, bh);
  }
  ctx.restore();
}

function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle, w: number, h: number, state: GameState) {
  const topH = obs.gapY;
  const bottomY = obs.gapY + obs.gapHeight;
  const bottomH = h - bottomY;

  // Upper cabinet
  ctx.fillStyle = GRAY;
  ctx.fillRect(obs.x, 0, obs.width, topH);
  ctx.fillStyle = GRAY_LIGHT;
  ctx.fillRect(obs.x + 4, 4, obs.width - 8, topH - 8);
  ctx.fillStyle = GRAY;
  // Cabinet handle
  ctx.fillRect(obs.x + obs.width / 2 - 8, topH - 16, 16, 6);

  // Lower cabinet
  ctx.fillStyle = GRAY;
  ctx.fillRect(obs.x, bottomY, obs.width, bottomH);
  ctx.fillStyle = GRAY_LIGHT;
  ctx.fillRect(obs.x + 4, bottomY + 4, obs.width - 8, bottomH - 8);
  // Handle
  ctx.fillRect(obs.x + obs.width / 2 - 8, bottomY + 10, 16, 6);

  // Center precision zone (red line)
  const centerY = obs.gapY + obs.gapHeight / 2;
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = PRIMARY;
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(obs.x, centerY);
  ctx.lineTo(obs.x + obs.width, centerY);
  ctx.stroke();
  ctx.setLineDash([]);
  // Precision zone rectangle
  const precisionH = obs.gapHeight * 0.25;
  ctx.fillStyle = PRIMARY;
  ctx.globalAlpha = 0.08;
  ctx.fillRect(obs.x, centerY - precisionH / 2, obs.width, precisionH);
  ctx.restore();

  // Moving indicator
  if (obs.moving) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = PRIMARY;
    const arrowY = obs.moving.speed > 0 ? bottomY + 2 : topH - 8;
    ctx.beginPath();
    ctx.moveTo(obs.x + obs.width / 2, arrowY);
    ctx.lineTo(obs.x + obs.width / 2 - 6, arrowY + (obs.moving.speed > 0 ? -8 : 8));
    ctx.lineTo(obs.x + obs.width / 2 + 6, arrowY + (obs.moving.speed > 0 ? -8 : 8));
    ctx.fill();
    ctx.restore();
  }
}

function drawBonus(ctx: CanvasRenderingContext2D, b: BonusItem, canvasH: number) {
  ctx.save();
  ctx.translate(b.x, b.y);

  // Glow
  ctx.shadowColor = PRIMARY;
  ctx.shadowBlur = 12;
  ctx.fillStyle = PRIMARY;
  ctx.beginPath();
  ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.fillStyle = WHITE;
  ctx.font = `800 ${Math.max(b.radius, 14)}px "Montserrat", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const icons: Record<string, string> = { screw: '⚙', level: '⚖', plug: '⚡' };
  ctx.fillText(icons[b.type] || '★', 0, 1);

  ctx.restore();
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.save();
  ctx.globalAlpha = p.life / p.maxLife;
  ctx.fillStyle = p.color;
  ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, player: { x: number; y: number; width: number; height: number; rotation: number; velocity: number }, stabilized: boolean) {
  ctx.save();
  ctx.translate(player.x + player.width / 2, player.y + player.height / 2);
  ctx.rotate(player.rotation);

  // Toolbox body
  ctx.fillStyle = PRIMARY_DARK;
  ctx.fillRect(-player.width / 2, -player.height / 2, player.width, player.height);

  // Toolbox front
  ctx.fillStyle = PRIMARY;
  ctx.fillRect(-player.width / 2 + 2, -player.height / 2 + 2, player.width - 4, player.height - 4);

  // Handle
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(-8, -player.height / 2 - 4, 16, 6);
  ctx.fillStyle = GRAY_LIGHT;
  ctx.fillRect(-6, -player.height / 2 - 3, 12, 4);

  // Wrench icon
  ctx.fillStyle = WHITE;
  ctx.font = 'bold 18px "Montserrat", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🔧', 0, 1);

  // Stabilization glow
  if (stabilized) {
    ctx.strokeStyle = PRIMARY;
    ctx.lineWidth = 2;
    ctx.strokeRect(-player.width / 2 - 3, -player.height / 2 - 3, player.width + 6, player.height + 6);
  }

  ctx.restore();
}

function drawHUD(ctx: CanvasRenderingContext2D, score: number, combo: number, multiplier: number, centerMeter: number, canvasW: number) {
  // Score
  ctx.save();
  ctx.fillStyle = WHITE;
  ctx.font = '800 28px "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`${score}`, 20, 40);

  // Multiplier
  if (multiplier > 1) {
    ctx.fillStyle = PRIMARY;
    ctx.font = '800 20px "Montserrat", sans-serif';
    ctx.fillText(`x${multiplier}`, 20, 66);
  }

  // Combo
  if (combo > 0) {
    ctx.fillStyle = PRIMARY;
    ctx.font = '800 16px "Montserrat", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`KOMBO ${combo}`, canvasW - 20, 34);
  }

  // Center meter (small bar top-right)
  if (centerMeter > 0) {
    const barW = 60;
    const barH = 6;
    const bx = canvasW - 16 - barW;
    const by = 40;
    ctx.fillStyle = GRAY;
    ctx.fillRect(bx, by, barW, barH);
    ctx.fillStyle = centerMeter > 0.7 ? PRIMARY : GRAY_LIGHT;
    ctx.fillRect(bx, by, barW * centerMeter, barH);
  }

  ctx.restore();
}

export function renderStartScreen(ctx: CanvasRenderingContext2D, w: number, h: number, bestScore: number) {
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(0, 0, w, h);

  drawBackground(ctx, w, h, 0);

  // Title
  ctx.fillStyle = WHITE;
  ctx.font = '800 32px "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KALUSTEASENNUS', w / 2, h * 0.22);
  ctx.fillStyle = PRIMARY;
  ctx.font = '800 42px "Montserrat", sans-serif';
  ctx.fillText('CHALLENGE', w / 2, h * 0.30);

  // Toolbox icon
  ctx.fillStyle = PRIMARY;
  ctx.fillRect(w / 2 - 20, h * 0.36, 40, 30);
  ctx.fillStyle = BG_DARK;
  ctx.fillRect(w / 2 - 8, h * 0.36 - 4, 16, 6);
  ctx.fillStyle = WHITE;
  ctx.font = '800 20px "Montserrat", sans-serif';
  ctx.fillText('🔧', w / 2, h * 0.36 + 18);

  // Best score
  if (bestScore > 0) {
    ctx.fillStyle = GRAY_LIGHT;
    ctx.font = '600 16px "Montserrat", sans-serif';
    ctx.fillText(`PARAS: ${bestScore}`, w / 2, h * 0.48);
  }

  // Instructions
  ctx.fillStyle = WHITE;
  ctx.font = '600 15px "Montserrat", sans-serif';
  ctx.fillText('SPACE / KLIKKAA / NAPAUTA = NOSTO', w / 2, h * 0.72);
  ctx.fillStyle = GRAY_LIGHT;
  ctx.font = '500 13px "Montserrat", sans-serif';
  ctx.fillText('Ohjaa työkalupakki kaappiaukkojen läpi', w / 2, h * 0.78);
  ctx.fillText('Pysy keskellä kombo-bonukselle!', w / 2, h * 0.83);
}

export function renderGameOver(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  score: number,
  bestScore: number,
  maxCombo: number
) {
  // Overlay
  ctx.fillStyle = 'rgba(0,0,0,0.75)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = WHITE;
  ctx.font = '800 32px "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('PELI OHI!', w / 2, h * 0.28);

  ctx.fillStyle = PRIMARY;
  ctx.font = '800 56px "Montserrat", sans-serif';
  ctx.fillText(`${score}`, w / 2, h * 0.40);

  ctx.fillStyle = GRAY_LIGHT;
  ctx.font = '600 16px "Montserrat", sans-serif';
  ctx.fillText(`PARAS: ${bestScore}`, w / 2, h * 0.48);
  if (maxCombo > 1) {
    ctx.fillText(`MAX KOMBO: ${maxCombo}`, w / 2, h * 0.53);
  }

  // Retry button area
  ctx.fillStyle = PRIMARY;
  const btnW = 240;
  const btnH = 52;
  const btnX = w / 2 - btnW / 2;
  const btnY = h * 0.62;
  ctx.beginPath();
  ctx.roundRect(btnX, btnY, btnW, btnH, 10);
  ctx.fill();
  ctx.fillStyle = WHITE;
  ctx.font = '800 18px "Montserrat", sans-serif';
  ctx.fillText('PELAA UUDELLEEN', w / 2, btnY + btnH / 2 + 5);

  // Daily challenge
  ctx.fillStyle = GRAY_LIGHT;
  ctx.font = '500 14px "Montserrat", sans-serif';
  ctx.fillText('tai napauta PÄIVÄN HAASTE', w / 2, h * 0.82);
}
