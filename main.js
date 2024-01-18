// Defines the canvas
const canvas = document.querySelector("canvas"); // Looks for the canvas in the HTML
const ctx = canvas.getContext("2d"); // Sets the canvas's perspective; in this case, rendering 2d objects.

// Defines canvas resolution
const resolution = 20;

// Deifnes the canvas's width & length in pixels
canvas.width = 1000;
canvas.height = 1000;

// Sets the value of the column and row measures 
const COLS = canvas.width / resolution; 
const ROWS = canvas.height / resolution; 
const running = true;

// Sets the game running to true on start
var gameRunning = true

// Sets up the generation counter
var generationNum = 0;

// Reset counter set to true
genReset = true;

// Makes & displays the grid
// Temporary variable that stores the first array arrangement in a variable
let grid = assembleGrid(); 
// Requests the next arrangement of the array on the grid
requestAnimationFrame(update); 
// Draws the grid in the console to display
console.log(grid)
// Function that draws the first (initial) grid on the canvas
render(grid); 

// Simple function that gets the (newest) grid and draws it on the canvas
function update() {
    grid = step(grid)
    render(grid);
    // Adds 1 to the current generation number
    generationNum += 1; 
    // Updates the span element in the HTML with the id "genNumber" to the current generation number
    document.getElementById("genNumber").innerHTML = generationNum;
}


setInterval(function() {
  /* This function delays the calling of the update function while the gameRunning variable is true.
  The delay is 100 JS ticks (100 ms) */

  // Otherwise, if false, then don't run the function
  if (gameRunning === true) {
    // Run the update funtion if true
    update();
  }
  // 100 refers to 100 ticks (milliseconds)
}, 100); 

// Function linked to the corresponding front-end button that "steps" the grid
function stepGrid() {
  step(grid);
  requestAnimationFrame(update);
  render(grid);
}

// Function linked to the corresponding front-end button that "resets" the grid (makes a new pattern)
function resetGrid() {
  /* This function resets the board back to a new randomized array pattern for the board to then evolve.
  First, it waits for the HTML button with the id "#resetButton" to be pressed. When it detects it's been clicked,
  it activates another inner function that assembles a new grid, renders it, transitions it to its next state, logs it in the console as complete,
  and then displays the next states in following succession. */

  // When the button with the corresponding ID is pressed, activate this specific inner function
  document.querySelector("#resetButton").onclick = function() {
    // The grid is reassembled (a new randomized array is created)
    grid = assembleGrid(true);
    // 
    requestAnimationFrame(update);
    console.log(grid);
    render(grid);
    generationNum = 0;
    document.getElementById("genNumber").innerHTML = generationNum
  }
}

// Pauses and resumes the game when clicked
function playPause() {
  gameRunning = !gameRunning;
  if (gameRunning) {
    document.getElementById("pauseResumeButton").innerHTML = "Pause";
    document.getElementById("stepButton").style.display = "none";
  } else {
    document.getElementById("pauseResumeButton").innerHTML = "Resume";
    document.getElementById("stepButton").style.display = "inline-block";
  }
  render(grid)
}

function assembleGrid() { 
/* This function builds the initial array of randomized 0's and 1's that will be the 
   initial configuration of the "starting" board.
First, it creates the grid as an array of the value of the constant columns.
Then, it uses the built-in .map() method/function to add another array on top of the columns as rows.
After that, it maps another array onto the 2 existing arrays to randomize the values of the array 
between 0 and 1. It then returns the array as an array of multiple manipulated arrays. */

    // Makes a new array of columsn filled with nothing (null)
    return new Array(COLS).fill(null)
    // Adds another new array on top of the existing one filled with nothing (null)
        .map(() => new Array(ROWS).fill(null) 
            // Uses Math.random and multiplies the randomly chosen decimal value by two and floors it to round it to the nearest value (0 or 1)
            .map(() => Math.floor(Math.random() * 2))); 
}

function step(grid) {
/* This function transfers the grid from one state to the next, and returns the newest processed state.
First, it creates cells as a part of every space within every column and every row, and gives the dimensions
as measures of 
*/

// The constant value for the "step" the grid takes from the old grid to the new one
  const step = grid.map(arr => [...arr]);

  // Two nested for loops that build cells within each column and row
  for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {

        // Sets up each cell within the grid's column and row measures
        const cell = grid[col][row];
        // Sets up the neighbor counter for each cell
        let numNeighbours = 0;

        // Two nested for loops that sense the cells around them and discount the cell being checked
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            // If the cell is checking itself, discount it from the neighbor count and continue
            if (x === 0 && y === 0) {
              continue;
            }

            // Sets 
            const x_cell = col + x;
            const y_cell = row + y;
  
            // 
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              const currentNeighbour = grid[col + x][row + y];
              numNeighbours += currentNeighbour;
            }
          }
        }
  
        // Conway's rules of Life

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
              // Checks if a cell is "true" or "false" (alive or dead)
              ctx.fillStyle = cell ? "black" : "white";
              // Fills in the cells with their assigned colors
              ctx.fill();
              // Renders the grid (the borders)
              ctx.stroke();
        }
    }
}