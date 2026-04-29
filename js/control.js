import { Snake } from "./snake.js";

function setupControls() {
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
}

export { setupControls };
