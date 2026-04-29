import { ctx, canvas } from "./canvas.js";
import { GRID_SIZE } from "./constants.js";

function drawGrid() {
  ctx.strokeStyle = "rgba(255, 165, 0, 0.5)";
  ctx.lineWidth = 1;

  for (let i = 0; i <= canvas.width; i += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let j = 0; j <= canvas.height; j += GRID_SIZE) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }
}

export { drawGrid };
