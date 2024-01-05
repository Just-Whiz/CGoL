// Defines the canvas
const canvas = document.querySelector("canvas"); // Looks for the canvas in the HTML
const ctx = canvas.getContext("2d"); // Sets the canvas's perspective; in this case, rendering 2d objects.

// Defines canvas properties
const resolution = 10;
canvas.width = 1000;
canvas.height = 800;

// Defines our column and row measures
const COLS = canvas.width / resolution; // 
const ROWS = canvas.height / resolution; // 

// Builds the grid as an array of 0's in the console
function buildGrid() { 
/* This function builds the grid as an array of randomized 0's and 1's in the console.
First, it creates the grid as an array of the value of the constant columns.
Then, it uses the .map() function to add another array on top of the columns as rows.
After that, it maps another array onto the ararys to randomize the values of 
*/
    // Makes a new array of columsn filled with nothing (null)
    return new Array(COLS).fill(null)
    // Adds another new array on top of the existing one filled with 0's without overlap
        .map(() => new Array(ROWS).fill(null) 
            .map(() => Math.floor(Math.random() * 2))); // Iterates the integers 0 & 1
}

// Variable that stores the grid array in a variable
let grid = buildGrid();
requestAnimationFrame(update);
console.log(grid)

// Function that draws the actual grid on the canvas
render(grid);

function update() {
    grid = nextGen(grid)
    render(grid);
    requestAnimationFrame(update);
}

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
          const cell = grid[col][row];
          let numNeighbours = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              if (x === 0 && y === 0) {
                continue;
              }
              const x_cell = col + x;
              const y_cell = row + y;
    
              if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                const currentNeighbour = grid[col + x][row + y];
                numNeighbours += currentNeighbour;
              }
            }
          }
    
          // rules
          if (cell === 1 && numNeighbours < 2) {
            nextGen[col][row] = 0;
          } else if (cell === 1 && numNeighbours > 3) {
            nextGen[col][row] = 0;
          } else if (cell === 0 && numNeighbours === 3) {
            nextGen[col][row] = 1;
          }
        }
      }
      return nextGen;
}


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
            ctx.stroke();
        }
    }
}