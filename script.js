const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let gameOver = false;

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

const Snake = {
  body: [
    { x: 60, y: 30 }, // Head
    { x: 30, y: 30 }, // Body
    { x: 0, y: 30 }, // Tail
  ],
  vx: 1,
  vy: 0,
  nextVx: 1,
  nextVy: 0,
  moveInterval: 0.15,
  moveTimer: 0,
  color: "green",
};

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

    const isOnSnake = Snake.body.some(
      (segment) => segment.x === fruit.x && segment.y === fruit.y,
    );

    if (!isOnSnake) {
      safeZone = true;
    }
  }
}
spawnFruit();

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

    // --- SCREEN WRAP LOGIC ---

    // X-Axis (Left and Right borders)
    if (newHead.x >= canvas.width) {
      newHead.x = 0; // Went off the right, appear on the left
    } else if (newHead.x < 0) {
      newHead.x = canvas.width - GRID_SIZE; // Went off the left, appear on the right
    }

    // Y-Axis (Top and Bottom borders)
    if (newHead.y >= canvas.height) {
      newHead.y = 0; // Went off the bottom, appear on the top
    } else if (newHead.y < 0) {
      newHead.y = canvas.height - GRID_SIZE; // Went off the top, appear on the bottom
    }

    Snake.body.unshift(newHead);

    // Checking collison with the fruit
    if (Snake.body[0].x === fruit.x && Snake.body[0].y === fruit.y) {
      console.log("Fruit Eaten");
      spawnFruit();
    } else {
      // snake growing logic
      Snake.body.pop();
    }

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

    Snake.moveTimer -= Snake.moveInterval;
  }
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

  drawFruit();

  drawSnake();
}

let lastTime = 0;

function loop(time) {
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  // limting the time different to under 150ms
  deltaTime = Math.min(deltaTime, 0.15);

  update(deltaTime);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
