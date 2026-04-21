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

ctx.fillStyle = block.color;
ctx.fillRect(block.x, block.y, block.width, block.height);

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      block.vx = 1;
      block.vy = 0;
      break;
    case "ArrowLeft":
      block.vx = -1;
      block.vy = 0;
      break;
    case "ArrowDown":
      block.vx = 0;
      block.vy = 1;
      break;
    case "ArrowUp":
      block.vx = 0;
      block.vy = -1;
      break;
  }
});

function update(deltaTime) {
  block.x = block.x + block.vx * block.speed * deltaTime;
  block.y = block.y + block.vy * block.speed * deltaTime;

  if (block.x > canvas.width) {
    block.x = -block.width; // wrap around
  }

  // else if (block.x < 0) {
  //   block.x = canvas.width;
  // }
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.width, block.height);
}

let lastTime = 0;

function loop(time) {
  const deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  update(deltaTime);
  render();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// let direction = "RIGHT";

// function handleKey(e) {
//   if (e.key === "ArrowUp") {
//     ctx.clearRect(x, y, width, height);
//     y -= 20;
//     ctx.fillRect(x, y, width, height);
//   } else if (e.key === "ArrowDown") {
//     ctx.clearRect(x, y, width, height);
//     y += 20;
//     ctx.fillRect(x, y, width, height);
//   } else if (e.key === "ArrowLeft") {
//     ctx.clearRect(x, y, width, height);
//     x -= 20;
//     ctx.fillRect(x, y, width, height);
//   } else if (e.key === "ArrowRight") {
//     ctx.clearRect(x, y, width, height);
//     x += 20;
//     ctx.fillRect(x, y, width, height);
//   }
// }
