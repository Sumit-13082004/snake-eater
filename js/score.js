import { ctx } from "./canvas.js";
import { score, highScore } from "./main.js";

function drawScore() {
  ctx.fillStyle = "white"; // Change to black if your canvas background is white
  ctx.font = "20px Arial";

  // Draw current score on the top left
  ctx.fillText("Score: " + score, 10, 30);

  // Draw high score on the top right
  // Adjust the 'canvas.width - 150' if the text gets cut off
  ctx.fillText("High Score: " + highScore, canvas.width - 150, 30);
}

export { drawScore };