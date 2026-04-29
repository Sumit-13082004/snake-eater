import { canvas } from "./canvas.js";

const GRID_SIZE = 30;

const cols = canvas.width / GRID_SIZE;
const rows = canvas.height / GRID_SIZE;

export { GRID_SIZE, cols, rows };
