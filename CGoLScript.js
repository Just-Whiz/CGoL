// Defines the canvas
const canvas = document.querySelector("canvas"); // Looks for the canvas in the HTML
const ctx = canvas.getContext("2d"); // Sets the canvas's perspective; in this case, rendering 2d objects.

// Defines canvas resolution
const resolution = 10;

// Deifnes the canvas's width & length in pixels
canvas.width = 1000;
canvas.height = 1000;

// Sets the value of the column and row measures 
const COLS = canvas.width / resolution; 
const ROWS = canvas.height / resolution; 
const running = true;

// Sets the game running to true on start
var gameRunning = true

// Temporary variable that stores the first array arrangement in a variable
let grid = assembleGrid();
requestAnimationFrame(update); // Requests 
console.log(grid)

// Function that draws the grid on the canvas
render(grid);

function update() {
    grid = step(grid)
    render(grid);
}



setInterval(function() {
  if (gameRunning === true) {
    update()
  }
}, 100);


function assembleGrid() { 
/* This function builds the initial array of randomized 0's and 1's that will be the 
   initial configuration of the "starting" board.
First, it creates the grid as an array of the value of the constant columns.
Then, it uses the built-in .map() method/function to add another array on top of the columns as rows.
After that, it maps another array onto the 2 existing arrays to randomize the values of the array 
between 0 and 1. It then returns the 
*/
    // Makes a new array of columsn filled with nothing (null)
    return new Array(COLS).fill(null)
    // Adds another new array on top of the existing one filled with 0's without overlap
        .map(() => new Array(ROWS).fill(null) 
            .map(() => Math.floor(Math.random() * 2))); // Iterates the integers 0 & 1
}

function step(grid) {
/* This function */

// The constant value for the "step" the grid takes from the old grid to the new one
  const step = grid.map(arr => [...arr]);

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
  
        // Conway's Rules of Life
        // Solitude death Rule
        if (cell === 1 && numNeighbours < 2) {
          step[col][row] = 0;
        // Overpopulation death rule
        } else if (cell === 1 && numNeighbours > 3) {
          step[col][row] = 0;
        // Birth rule
        } else if (cell === 0 && numNeighbours === 3) {
          step[col][row] = 1;
        }
      }
    }
    // Returns the step variable once all the logic has been run through
    return step; 
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
              //ctx.stroke();
        }
    }
}