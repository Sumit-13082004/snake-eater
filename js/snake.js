import { ctx } from "./canvas.js";
import { GRID_SIZE } from "./constants.js";
import { canvas } from "./canvas.js";
import { fruit, spawnFruit } from "./fruit.js";
import { gameOver } from "./main.js";

function bodyCollison() {
  for (let i = 1; i < Snake.body.length; i++) {
    if (
      Snake.body[0].x === Snake.body[i].x &&
      Snake.body[0].y === Snake.body[i].y
    ) {
      gameOver = true;
      console.log("Game Over! You bit yourself.");
      break;
    }
  }
}

function fruitCollison() {
  // Checking collison with the fruit
  if (Snake.body[0].x === fruit.x && Snake.body[0].y === fruit.y) {
    console.log("Fruit Eaten");
    spawnFruit();
  } else {
    // snake growing logic
    Snake.body.pop();
  }
}

function screenWrap(newHead) {
  if (newHead.x >= canvas.width) {
    newHead.x = 0;
  } else if (newHead.x < 0) {
    newHead.x = canvas.width - GRID_SIZE;
  }

  if (newHead.y >= canvas.height) {
    newHead.y = 0;
  } else if (newHead.y < 0) {
    newHead.y = canvas.height - GRID_SIZE;
  }
}

function drawSnake() {
  ctx.fillStyle = Snake.color;
  for (const segment of Snake.body) {
    ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
  }
}

function updateSnakePosition(deltaTime) {
  if (gameOver) {
    return;
  }

  Snake.moveTimer += deltaTime;

  if (Snake.moveTimer >= Snake.moveInterval) {
    Snake.vx = Snake.nextVx;
    Snake.vy = Snake.nextVy;

    const currentHead = Snake.body[0];

    let newHead = {
      x: currentHead.x + Snake.vx * GRID_SIZE,
      y: currentHead.y + Snake.vy * GRID_SIZE,
    };

    screenWrap(newHead);

    Snake.body.unshift(newHead);

    fruitCollison();
    bodyCollison();

    Snake.moveTimer -= Snake.moveInterval;
  }
}

const Snake = {
  body: [
    { x: 90, y: 30 }, // Head
    { x: 60, y: 30 }, // Body
    { x: 30, y: 30 }, // Tail
  ],
  vx: 1,
  vy: 0,
  nextVx: 1,
  nextVy: 0,
  moveInterval: 0.15,
  moveTimer: 0,
  color: "green",
};

export { Snake, drawSnake, updateSnakePosition };
