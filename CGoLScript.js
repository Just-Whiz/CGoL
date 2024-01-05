// Defines the canvas
const canvas = document.querySelector("canvas"); // Looks for the canvas in the HTML
const ctx = canvas.getContext("2d"); // Sets the canvas's perspective; in this case, rendering 2d objects.

// Defines canvas properties
const resolution = 40;
canvas.width = 400;
canvas.height = 400;

// Defines our column and row measures
const columns = canvas.width / resolution;
const rows = canvas.height / resolution;

function buildGrid() { 
    return new Array(columns).fill(null).map(() => new Array(rows).fill(0));
}

const grid = buildGrid();

console.log(grid)