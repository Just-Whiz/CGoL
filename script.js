/* 
Program name: Conway's Game of Life JS
Student Name: Christian Suy
# Course: Intersession Independent Study: Computer Science Principles (Leveraging Conway's Game of Life as a Learning tool)
# Advisor: Mr. Abanto
# Date/version: 01/18/24
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
Adding a delay to a function being constantly called: https://stackoverflow.com/questions/14226803/wait-5-seconds-before-executing-next-line
*/

// Looks for the canvas in the HTML as a constant value
const canvas = document.querySelector("canvas"); 

// Defines the canvas as a constant variable and sets the canvas's perspective to render 2-dimensional objects
const ctx = canvas.getContext("2d"); 

// Defines canvas resolution
const resolution = 20;

// Defines the canvas's width & length in pixels
canvas.width = 1000;
canvas.height = 1000;

// Sets the value of the column and row measures as the measures of canvas.width and canvas.height divided by the canvas's resolution
// 1000 / 20 = 50 columns
const COLS = canvas.width / resolution; 
// 1000 / 20 = 50 rows
const ROWS = canvas.height / resolution; 

// Sets the game running to true on start
var gameRunning = true

// Sets up the generation counter
var generationNum = 0;

// Reset counter set to true
genReset = true;

// Sets up the color inversion checker to a TRUE state whenever the code is run for the first time
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
  /* This function simply toggles between TRUE/FAlsE state of the colorInversion variable when called.*/
  colorInversion = !colorInversion;
}

function update() {
  /* This function gets the newest grid and draws it on the canvas. It does not return any values, only completes a simple algorithm when called.*/

    // Updates the grid to its next current state
    grid = step(grid)
    // Render the grid by calling the render function for the grid
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
    // Run the update function if true
    update();
  }
  // 100 refers to 100 ticks (milliseconds)
}, 100); 

// Function linked to the corresponding front-end button that "steps" the grid
function stepGrid() {
  /* This function "steps" the grid forward in time by one generation. 
  First, it calls the "step" function to update and get the next iteration of the board. Once it does, the JS tells the browser to call a 
  specific function and update the animation for the next canvas "drawing". Once done calling the updating function (conveniently named update),
  it then renders the grid using the render(grid) function to draw the current iteration of the canvas once processed.
  */

  // Updates the grid to its next current state
  step(grid);
  // Tells the canvas to get ready to redraw/re-render the next updated values on the canvas's display
  requestAnimationFrame(update);
  // Render the grid by calling the render function for the grid
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
    // The grid is reassembled (a new randomized array is created) and its state is set to true
    grid = assembleGrid(true);
    // Requests the canvas to animate the following argument (the update function)
    requestAnimationFrame(update);
    // Log/display the built grid in the console
    console.log(grid);
    // Render the grid
    render(grid);
    // Reset the generation counter in the HTML and JS
    generationNum = 0;
    // Changes the text of the generation number counter in the HTML to be updated to the current number of the generationNum variable
    document.getElementById("genNumber").innerHTML = generationNum;
  }
}

// Pauses and resumes the game when clicked
function playPause() {
  /* This function pauses and resumes the game when clicked. 
  Two buttons are hidden for different reasons while the game is running. The first is the step button. Only when paused will the button be 
  allowed to be shown, and its function be run. Otherwise, if the game is running, you are not able to "step". When the game is running, the 
  color inversion button pops up as the color inversion can only be rendered while the game is running and updating. Otherwise, if the game is paused,
  then the option to toggle between dark and light colors will not be available due to the inability to update instantaneously. 
  
  Global Variables
  gameRunning - A variable that is toggled between TRUE and FALSE states to determine if the game is paused or not
  grid - Temporary variable that stores the constantly updating states of the grid of the Game of Life
  */

  // Toggles between true and false of the gameRunning variable with the ! operator
  gameRunning = !gameRunning;
  // If gameRunning is true
  if (gameRunning) {
    // Change the text of the pause/resume button in the HTML to say pause
    document.getElementById("pauseResumeButton").innerHTML = "Pause";
    // hide the step button from the buttons
    document.getElementById("stepButton").style.display = "none";
    // Display the color inversion button from the buttons options
    document.getElementById("toggleColors").style.display = "inline-block";
    // Otherwise execute this
  } else {
    // Change the text of the pause/resume button to say resume
    document.getElementById("pauseResumeButton").innerHTML = "Resume";
    // Display the step button in the same "line" style as the other buttons
    document.getElementById("stepButton").style.display = "inline-block";
    // Hide the color inversion button from the buttons options
    document.getElementById("toggleColors").style.display = "none";
  }
  // Render the grid by calling the render function for the grid
  render(grid);
}

function assembleGrid() { 
/* This function builds the initial array of randomized 0's and 1's that will be the 
   initial configuration of the "starting" board.
First, it creates the grid as an array of the value of the constant columns.
Then, it uses the built-in .map() method/function to add another array on top of the columns as rows.
After that, it maps another array onto the 2 existing arrays to randomize the values of the array 
between 0 and 1. It then returns the array as an array of multiple manipulated arrays. 

Global Variables: 
ROWS - A value that defines the amount of rows present in the grid
COLS - A value that defines the amount of columns present in the grid
*/

    // Makes a new array of columns filled with nothing (null)
    return new Array(COLS).fill(null)
    // Adds another new array on top of the existing one filled with nothing (null)
        .map(() => new Array(ROWS).fill(null) 
            // Uses Math.random and multiplies the randomly chosen decimal value by two and floors it to round it to the nearest value (0 or 1)
            .map(() => Math.floor(Math.random() * 2))); 
}

function step(grid) {
/* This function transfers the grid from one state to the next, and returns the newest processed state.
First, it creates cells as a part of every space within every column and every row, and gives the dimensions
as measures of the col and row values. It takes in the variable grid as an argument in order to transfer the first 
iteration of the grid to the next in order to update it according to the rules of Life.

SOURCES USED:
// 2D Array traversal source: https://www.geeksforgeeks.org/how-to-traverse-2d-arrays-in-javascript/#
.map() method function source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
Cell Detection Algorithm reference source: https://stackoverflow.com/questions/3330181/algorithm-for-finding-nearest-object-on-2d-grid
2D out of bounds prevention reference source: https://stackoverflow.com/questions/15004992/getting-the-edge-value-of-a-2d-array-while-preventing-getting-out-of-bounds

Local Variables:

step - Defines the next state of the grid (taking the next "current" grid by overwriting the old grid values with the new values)
col - Defines the columns as being the length of the grid
row - Defines the rows as being the length of the columns of the grid
cell - Defines each value in the array as a "cell" variable
neighborCount - Defines the counter for a cell's current amount of live neighbors in its "local neighborhood" (the 8 cells surrounding the current cell)
x - Defines the temporary variable for each cell that defines its current miniature coordinate plane on the x-axis (its local neighborhood of cells, with the current cell at (0,0))
y - Defines the temporary variable for each cell that defines its current miniature coordinate plane on the y-axis (its local neighborhood of cells, with the current cell at (0,0))
x_cell - Defines the constant directional vector that scans the x-axis of the "current" cell's local neighborhood for live neighbors
y_cell - Defines the constant directional vector that scans the y-axis of the "current" cell's local neighborhood for live neighbors
currentNeighbor - A constant value that grabs the current neighbor by moving each directional vector around by -1 while each vector (x and y) are less than 2

Global Variables:

ROWS - A value that defines the amount of rows present in the grid
COLS - A value that defines the amount of columns present in the grid
grid - Temporary variable that stores the constantly updating states of the grid of the Game of Life
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
        // Looping through all cells relative to the current x position while x < 2 in the current local cell's "neighborhood"
        for (let x = -1; x < 2; x++) {
          // Loop through all cells relative to the current y position while y < 2 in the current local cell's "neighborhood"
          for (let y = -1; y < 2; y++) {
            // If the cell is checking itself, discount it from the neighbor count and continue
            if (x === 0 && y === 0) {
              // Carry on with the other instructions present in the loop
              continue;
            }

            // Sets the directional vectors up
            // Directional x vector
            const x_cell = col + x;
            // Directional y vector
            const y_cell = row + y;
  
            // Checks if the cell that we're currently checking is outside of the domain (on an edge AKA if the cell is checking an area "out of bounds")
            if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
              // Create a constant value that "grabs" the current neighbor by moving the vectors around each time the for loop is run
              const currentNeighbour = grid[col + x][row + y];
              // Adds the neighboring cell to the count
              neighborCount += currentNeighbour;
            }
          }
        }
  
        // Conway's Rules of Life defined below:
        // Note the survivability rule is 

        // Solitude death Rule
        // If a cell is alive and has less than 2 neighbors
        if (cell === 1 && neighborCount < 2) {
          // On the next state of the board, turn the cell dead (by solitude)
          step[col][row] = 0;
        // Overpopulation death rule
        // If the cell is alive and has more than 3 neighbors (by overpopulation)
        } else if (cell === 1 && neighborCount > 3) {
          // On the next state of the board, turn the cell dead
          step[col][row] = 0;
        // Birth rule
        // If the cell is dead and has exactly three neighbors
        } else if (cell === 0 && neighborCount === 3) {
          // On the next state of the board, turn the cell alive (as if by birth, or reproduction)
          step[col][row] = 1;
        }
      }
    }
    // Returns the next state of the board in a variable
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

  Local Variables: 

  col - Defines the columns as being the length of the grid
  row - Defines the rows as being the length of the columns of the grid

  Global Variables:
  ctx - Defines the HTML canvas value as a JS value
  grid - Temporary variable that stores the constantly updating states of the grid of the Game of Life
  colorInversion - A variable that is toggled between TRUE and FALSE states to determine the color of the current cells on the board
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

              // Checks if a cell is "true" or "false" (alive or dead) and changes/inverts the colors of the cell based on a variable state
              // If the colorInversion variable is toggled to a TRUE state
              if (colorInversion === true) {
                // Let the colors of each cell while alive to be black, and those dead to be white
                ctx.fillStyle = cell ? "black" : "white";
              } else {
                // Let the colors of each cell while alive to be white, and those dead to be black
                ctx.fillStyle = cell ? "white" : "black";
              }
              // Fills in the cells with their assigned colors
              ctx.fill();
              // Renders the grid borders (commented out for aesthetic purposes)
              //ctx.stroke();
        }
    }
  }
