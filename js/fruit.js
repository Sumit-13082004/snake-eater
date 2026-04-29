import { cols, rows, GRID_SIZE } from "./constants.js";
import { Snake } from "./snake.js";
import { ctx } from "./canvas.js";

function drawFruit() {
  ctx.fillStyle = fruit.color;
  ctx.beginPath();
  ctx.arc(
    fruit.x + GRID_SIZE / 2,
    fruit.y + GRID_SIZE / 2,
    fruit.radius,
    0,
    Math.PI * 2,
  );
  ctx.fill();
}

function spawnFruit() {
  let safeZone = false;
  while (!safeZone) {
    const randomCol = Math.floor(Math.random() * cols);
    const randomRow = Math.floor(Math.random() * rows);

    fruit.x = randomCol * GRID_SIZE;
    fruit.y = randomRow * GRID_SIZE;

    const isOnSnake = Snake.body.some(
      (segment) => segment.x === fruit.x && segment.y === fruit.y,
    );

    if (!isOnSnake) {
      safeZone = true;
    }
  }
}

const fruit = {
  x: null,
  y: null,
  radius: 10,
  color: "red",
};

export { fruit, spawnFruit, drawFruit };
