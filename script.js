const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
let x = 10;
let y = 10;
let width = 30;
let height = 30;
ctx.fillRect(x, y, width, height);

let direction = "RIGHT";

function handleKey(e) {
    if (e.key === "ArrowUp") {
        ctx.clearRect(x, y, width, height);
        y -= 20
        ctx.fillRect(x, y, width, height);
    } else if (e.key === "ArrowDown") {
        ctx.clearRect(x, y, width, height);
        y += 20
        ctx.fillRect(x, y, width, height);
    } else if (e.key === "ArrowLeft") {
        ctx.clearRect(x, y, width, height);
        x -= 20
        ctx.fillRect(x, y, width, height);
    } else if (e.key === "ArrowRight") {
        ctx.clearRect(x, y, width, height);
        x += 20
        ctx.fillRect(x, y, width, height);
    }
}

let lastTime = performance.now();
let frames = 0;

function measure(time) {
    frames++;

    if (time - lastTime >= 1000) {
        console.log("FPS:", frames);
        frames = 0;
        lastTime = time;
    }

    requestAnimationFrame(measure);
}

requestAnimationFrame(measure);

document.addEventListener("keydown", handleKey);

    