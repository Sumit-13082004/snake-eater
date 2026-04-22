const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let x = 10;
let y = 10;
let width = 30;
let height = 30;

const block = {
  x: 10,
  y: 10,
  width: 30,
  height: 30,
  color: "green",
  speed: 120, // 120px per second
  vx: 1,
  vy: 0,
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      // Only turn Right if we aren't currently moving Left
      if (block.vx !== -1) {
        block.vx = 1;
        block.vy = 0;
      }
      break;
    case "ArrowLeft":
      // Only turn Left if we aren't currently moving Right
      if (block.vx !== 1) {
        block.vx = -1;
        block.vy = 0;
      }
      break;
    case "ArrowDown":
      // Only turn Down if we aren't currently moving Up
      if (block.vy !== -1) {
        block.vx = 0;
        block.vy = 1;
      }
      break;
    case "ArrowUp":
      // Only turn Up if we aren't currently moving Down
      if (block.vy !== 1) {
        block.vx = 0;
        block.vy = -1;
      }
      break;
  }
});

function update(deltaTime) {
  block.x = block.x + block.vx * block.speed * deltaTime;
  block.y = block.y + block.vy * block.speed * deltaTime;

  // screen wrap
  if (block.x > canvas.width) {
    block.x = -block.width; // wrap around
  } else if (block.x < -block.width) {
    block.x = canvas.width;
  }

  if (block.y > canvas.height) {
    block.y = -block.height;
  } else if (block.y < -block.height) {
    block.y = canvas.height;
  }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.width, block.height);
}

let lastTime = 0;

function loop(time) {
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  // setting max deltaTime
  deltaTime = Math.min(deltaTime, 0.05);

  update(deltaTime);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
