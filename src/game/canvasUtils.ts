/**
 * Sets up canvas for high-DPI (retina) displays.
 * Returns logical width/height for drawing. Call this at the start of each frame.
 */
export function setupCanvasForRetina(
  canvas: HTMLCanvasElement,
  logicalW: number,
  logicalH: number
): { ctx: CanvasRenderingContext2D; w: number; h: number } {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");

  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  canvas.width = logicalW * dpr;
  canvas.height = logicalH * dpr;
  canvas.style.width = `${logicalW}px`;
  canvas.style.height = `${logicalH}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  return { ctx, w: logicalW, h: logicalH };
}
