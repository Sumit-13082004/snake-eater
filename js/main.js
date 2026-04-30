import { ctx, canvas } from "./canvas.js";
import { drawSnake, updateSnakePosition, resetSnake } from "./snake.js";
import { drawGrid } from "./gridLayout.js";
import { setupControls } from "./control.js";
import { drawFruit, spawnFruit } from "./fruit.js";
import { drawScore } from "./score.js";

const uiLayer = document.getElementById("ui-layer");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const gameTitle = document.getElementById("game-title");

let lastTime = 0;
let gameOver = false;
let animationId;

let score = 0;
// Ask localStorage for the saved score. If it doesn't exist yet, default to 0.
let highScore = localStorage.getItem("snakeHighScore") || 0;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScore();

  drawGrid();

  drawSnake();

  drawFruit();
}

function update(deltaTime) {
  if (gameOver) {
    return;
  }

  const status = updateSnakePosition(deltaTime);

  if (status.ateFruit) {
    score += 10;
    console.log("Fruit Eaten - Score is now: " + score);
    spawnFruit();
  }

  if (status.died) {
    gameOver = true;
    console.log("Game Over! You bit yourself.");

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snakeHighScore", highScore);
    }

    uiLayer.classList.remove("hidden");
    startBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    gameTitle.innerText = "GAME OVER";
  }
}

function gameLoop(time) {
  let deltaTime = (time - lastTime) / 1000;
  lastTime = time;

  deltaTime = Math.min(deltaTime, 0.15);

  update(deltaTime);

  render();

  requestAnimationFrame(gameLoop);
}

startBtn.addEventListener("click", () => {
  uiLayer.classList.add("hidden"); // Hide the menu
  setupControls(); // Turn on keyboard
  spawnFruit();
  lastTime = performance.now(); // Initialize time
  animationId = requestAnimationFrame(gameLoop); // Start the game!
});

restartBtn.addEventListener("click", () => {
  uiLayer.classList.add("hidden");
  gameOver = false;
  score = 0;
  resetSnake(); // Put snake back to start
  spawnFruit(); // Get a fresh fruit
  lastTime = performance.now();
  animationId = requestAnimationFrame(gameLoop);
});

export { score, highScore };