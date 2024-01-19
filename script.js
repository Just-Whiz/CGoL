/* 
Program name: Conway's Game of Life JS
Student Name: Christian Suy
# Course: Intersession Independent Study: Computer Science Principles (Leveraging Conway's Game of Life as a Learning tool)
# Advisor: Mr. Abanto
# Date/version: 01/18/23
# I pledge my honor

ALL REFERENCE SOURCES USED LINKED BELOW:

W3Schools links (references):
JS Array methods: https://www.w3schools.com/js/js_array_methods.asp
JS Array example: https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_instanceof
JS Array reference: https://www.w3schools.com/jsref/jsref_obj_array.asp
JS Array storage: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_array
JS Assignment (operators): https://www.w3schools.com/js/js_assignment.asp
??= JS Assignment Operator Example: https://www.w3schools.com/js/tryit.asp?filename=tryjs_assign_nullish
JS Conditional Statements: https://www.w3schools.com/js/js_if_else.asp
JS Variables: https://www.w3schools.com/js/js_variables.asp
$ JS "main" variable: https://www.w3schools.com/js/tryit.asp?filename=tryjs_variables_dollar
JS Best Practices: https://www.w3schools.com/js/js_best_practices.asp
JS Common Mistakes: https://www.w3schools.com/js/js_mistakes.asp
JS Common Latency Objects: https://www.w3schools.com/js/js_performance.asp
https://www.w3schools.com/js/js_htmldom_html.asp


Stack Overflow links:
Adding a delay to a funciton being constantly called: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
*/

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

var colorInversion = true;

// Makes & displays the grid
// Temporary variable that stores the first array arrangement in a variable
let grid = assembleGrid(); 
// Requests the next arrangement of the array on the grid
requestAnimationFrame(update); 
// Draws the grid in the console to display
console.log(grid)
// Function that draws the first (initial) grid on the canvas
render(grid); 

function toggleCellColors() {
  colorInversion = !colorInversion;
}

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
  and then displays the next states in following succession. Finally, it changes the generation number
  to 0, and uses JS DOM to manipulate the HTML value to display the "reset" generation number. 
  
  SOURCES USED: 
  requestAnimationFrame() method: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
  */

  // When the button with the corresponding ID is pressed, activate this specific inner function
  document.querySelector("#resetButton").onclick = function() {
    // The grid is reassembled (a new randomized array is created)
    grid = assembleGrid(true);
    // Requests the canvas to animate the following argument (the update function)
    requestAnimationFrame(update);
    // Log/display the built grid in the console
    console.log(grid);
    // Render the grid
    render(grid);
    // Reset the generation counter in the HTML and JS
    generationNum = 0;
    document.getElementById("genNumber").innerHTML = generationNum;
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
  render(grid);
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
as measures of the col and row values. 


SOURCES USED:
// 2D Array traversal source: https://www.geeksforgeeks.org/how-to-traverse-2d-arrays-in-javascript/#
.map() method function source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
Cell Detection Algorithm reference source: https://stackoverflow.com/questions/3330181/algorithm-for-finding-nearest-object-on-2d-grid
2D out of bounds prevention reference source: https://stackoverflow.com/questions/15004992/getting-the-edge-value-of-a-2d-array-while-preventing-getting-out-of-bounds
*/

// The constant value for the "step" the grid takes from the old grid to the new one
  const step = grid.map(arr => [...arr]);

  // Two nested for loops that build cells within each column and row
  for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        // Sets up a cell as variable for all values within the grid's column and row measures
        const cell = grid[col][row];
        // Sets the neighbor count to 0
        let neighborCount = 0;
        // Two nested for loops that sense the cells around them and finds the current cell
        // Looping through all cells relative to the current x position while x < 2
        for (let x = -1; x < 2; x++) {
          // Loop through all cells relative to the current y position while y < 2
          for (let y = -1; y < 2; y++) {
            // If the cell is checking itself, discount it from the neighbor count and continue
            if (x === 0 && y === 0) {
              continue;
            }

            // Sets the directional vectors up
            // Directional x vector
            const x_cell = col + x;
            // Directional y vector
            const y_cell = row + y;
  
            // Checks if the cell that we're currently checking is outside of the domain (on an edge)
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              // Create a constant value that "grabs" the current neighbor
              const currentNeighbour = grid[col + x][row + y];
              // Adds the neighboring cell to the count
              neighborCount += currentNeighbour;
            }
          }
        }
  
        // Conway's rules of Life

        // Solitude death Rule
        // If a cell is alive (1)
        if (cell === 1 && neighborCount < 2) {
          step[col][row] = 0;
        // Overpopulation death rule
        // If the cell has more than 3 neighbors
        } else if (cell === 1 && neighborCount > 3) {
          step[col][row] = 0;
        // Birth rule
        // If the cell has exactly three neighbors
        } else if (cell === 0 && neighborCount === 3) {
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
  Finally, it returns the next iteration of the board as a variable (called step) that maps this next
  iteration onto the previous array to create the "current" state of the board.

  SOURCES USED:

  Canvas methods, functions, and references: https://www.w3schools.com/jsref/api_canvas.asp
  */
  
      // For loop that iterates through all the columns as long as col is equal to 0
      for (let col = 0; col < grid.length; col++) {
          // Then iterates through all the rows as long as rows is equal to 0
          for (let row = 0; row < grid[col].length; row++) {
              // Adds cells to every column and row
              const cell = grid[col][row]
  
              // Tells the canvas to begin drawing
              ctx.beginPath();
              // Draws rectangles around everything (each cell present in each column, and each row) and a rectangle around the entirety of the canvas
              ctx.rect(col * resolution, row * resolution, resolution, resolution);
              // Checks if a cell is "true" or "false" (alive or dead)
              if (colorInversion === true) {
                ctx.fillStyle = cell ? "black" : "white";
              } else {
                ctx.fillStyle = cell ? "white" : "black";
              }
              // Fills in the cells with their assigned colors
              ctx.fill();
              // Renders the grid borders (commented out for aesthetic purposes)
              //ctx.stroke();
        }
    }
  }