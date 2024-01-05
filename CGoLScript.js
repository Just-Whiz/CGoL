// Defines the canvas
const canvas = document.querySelector("canvas"); // Looks for the canvas in the HTML
const ctx = canvas.getContext("2d"); // Sets the canvas's perspective; in this case, rendering 2d objects.

// Defines canvas properties
const resolution = 40;
canvas.width = 400;
canvas.height = 400;

// Defines our column and row measures
const columns = canvas.height / resolution; // 400/40 = 10 columns
const rows = canvas.height / resolution; // 400/40 = 10 rows

// Builds the grid as an array of 0's in the console
function buildGrid() { 
    // Makes a new array of columsn filled with nothing (null)
    return new Array(columns).fill(null)
    // Adds another new array on top of the existing one filled with 0's without overlap
        .map(() => new Array(rows).fill(null)
        .map(() => Math.floor(Math.random() * 2)));
}

// Variable that stores the grid array in a variable
const grid = buildGrid();
console.log(grid)
// Function that draws the actual grid on the canvas
render(grid);

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]
            
            // B
            ctx.beginPath();
            // Draws rectangles around everything (each cell present in each column, and each row) and a rectangle around the entirety of the canvas
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? "black" : "white";
            ctx.fill();
            ctx.stroke();
        }
    }
}


