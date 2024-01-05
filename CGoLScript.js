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
/* This function returns a 
First, it creates the grid as an array of the value of the constant columns.
Then, it uses the .map() function to add another array on top of 
*/
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


function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            const neighborCounter = 0;
            
            // Then another for loop iterates through the cells surrounding neighbors
            // Iterates through the "x" axis of the array (the rows essentially)
            for (let x = -1; x < 2; x++) {
                // Iterates through the "y" axis of the array (the columns)
                for (let y = -1; y < 2; j++) {
                    // This code discerns "self" from other (discounting itself from the "neighbor count")
                    if (x === 0 && y === 0) { // If the "current" coordinate of the cell are equivlant to 0,0 or itself
                        continue; // Don't do anything and continue 
                    }
                    const currentNeighbor = grid[col + x][col + y]
                    neighborCounter += currentNeighbor
                }
            }
            // Conway's rules of life below
            if (cell === 1 && neighborCounter < 2) {
                nextGen[col][row] = 0;
            }
        }
    }
}

setInterval(function() {
    var x = localStorage.getItem();
    document.getElementByID().innerHTML = x;
}, 100);






function render(grid) {
/* This function draws the grid and cells out and applies the logic that starts the 
First, the grid is defined through a for loop and iterate through to create all columns and rows presently seen.
It then creates cells within the confines of the rows and columns. After creating the cells,
we create x and y coordinates that are run through a for loop within each cell individual cell
(dead or alive, represented by 0 or 1) to count its current number of "neighbors" in its local neighborhood
(typically the 8 cells around it), and disregards itself from that count. It then adds Life's rules to each cell.
Once done, it then 

Local Variables:

*/

    // For loop that iterates through all the columns
    for (let col = 0; col < grid.length; col++) {
        // Then iterates through all the rows
        for (let row = 0; row < grid[col].length; row++) {
            // Adds cells to every column and row
            const cell = grid[col][row]

            // Tells the canvas to begin drawing
            ctx.beginPath();
            // Draws rectangles around everything (each cell present in each column, and each row) and a rectangle around the entirety of the canvas
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            // 
            ctx.fillStyle = cell ? "black" : "white";
            // Fills in the cells with their assigned colors
            ctx.fill();
            // Renders the grid (the borders)
            //ctx.stroke();
        }
    }
}
