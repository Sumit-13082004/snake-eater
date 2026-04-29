import { ctx, canvas } from "./canvas.js";
import { drawSnake, updateSnakePosition } from "./snake.js";
import { drawGrid } from "./gridLayout.js";
import { setupControls } from "./control.js";
import { drawFruit, spawnFruit } from "./fruit.js";

let lastTime = 0;
let gameOver = false;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  drawSnake();

  drawFruit();
}

function update(deltaTime) {
  updateSnakePosition(deltaTime);
}

function gameLoop(time) {
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  deltaTime = Math.min(deltaTime, 0.15);

  update(deltaTime);

  render();

  requestAnimationFrame(gameLoop);
}

spawnFruit();

setupControls();

requestAnimationFrame(gameLoop);

export { gameOver };
