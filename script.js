const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GRID_SIZE = 30;

const cols = canvas.width / GRID_SIZE;
const rows = canvas.height / GRID_SIZE;

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

drawGrid();

let x = 10;
let y = 10;
let width = 30;
let height = 30;

// const block = {
//   x: 0,
//   y: 0,
//   width: 30,
//   height: 30,
//   color: "green",
//   vx: 1,
//   vy: 0,
//   moveInterval: 0.15,
//   moveTimer: 0,
// };

const Snake = {
  body: [
    { x: 60, y: 30 }, // Head
    { x: 30, y: 30 }, // Body
    { x: 0, y: 30 }  // Tail
  ],
  vx: 1,
  vy: 0,
  nextVx: 1,
  nextVy: 0,
  moveInterval: 0.15,
  moveTimer: 0,
  color: "green",
}

const fruit = {
  x: null,
  y: null,
  radius: 10,
  color: "red",
};

function spawnFruit() {
  let safeZone = false;
  while (!safeZone) {
    const randomCol = Math.floor(Math.random() * cols);
    const randomRow = Math.floor(Math.random() * rows);

    fruit.x = randomCol * GRID_SIZE;
    fruit.y = randomRow * GRID_SIZE;

    if (fruit.x !== block.x || fruit.y !== block.y) {
      safeZone = true;
    }
  }
}

// spawnFruit();

window.addEventListener("keydown", (e) => {
  // Prevent default scrolling when using arrow keys
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }

  // Update next velocity, preventing 180-degree turns
  if (e.key === "ArrowUp" && Snake.vy === 0) {
    Snake.nextVx = 0;
    Snake.nextVy = -1;
  } else if (e.key === "ArrowDown" && Snake.vy === 0) {
    Snake.nextVx = 0;
    Snake.nextVy = 1;
  } else if (e.key === "ArrowLeft" && Snake.vx === 0) {
    Snake.nextVx = -1;
    Snake.nextVy = 0;
  } else if (e.key === "ArrowRight" && Snake.vx === 0) {
    Snake.nextVx = 1;
    Snake.nextVy = 0;
  }
});

function update(deltaTime) {
  Snake.moveTimer += deltaTime;

  if (Snake.moveTimer >= Snake.moveInterval) {
    Snake.vx = Snake.nextVx;
    Snake.vy = Snake.nextVy;

    const currentHead = Snake.body[0];
    const newHead = {
      x: currentHead.x + (Snake.vx * GRID_SIZE),
      y: currentHead.y + (Snake.vy * GRID_SIZE)
    };

    Snake.body.unshift(newHead);
    Snake.body.pop();

    Snake.moveTimer -= Snake.moveInterval;

    // block.x += block.vx * GRID_SIZE;
    // block.y += block.vy * GRID_SIZE;

    // if (block.x >= canvas.width) {
    //   block.x = 0;
    // } else if (block.x < 0) {
    //   block.x = canvas.width - GRID_SIZE;
    // }

    // if (block.y >= canvas.height) {
    //   block.y = 0;
    // } else if (block.y < 0) {
    //   block.y = canvas.height - GRID_SIZE;
    // }
  }

  // if (block.x === fruit.x && block.y === fruit.y) {
  //   console.log("Fruit eaten");
  //   spawnFruit();
  // }
}

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

function drawSnake() {
  ctx.fillStyle = Snake.color;
  for (const segment of Snake.body) {
    ctx.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();

  // drawFruit();

  drawSnake();
}

let lastTime = 0;

function loop(time) {
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  deltaTime = Math.min(deltaTime, 0.15);

  update(deltaTime);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
