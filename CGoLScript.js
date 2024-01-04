const gameBoard = document.querySelector("#gameBoard"); // Assigns a variable defining the gameboard (the canvas)
const ctx = gameBoard.getContext("2d"); // 
const generationCount = document.querySelector("#generationCount"); // Assigns a variable to the generation counter
const resetBtn = document.querySelector("resetBtn"); // Assigns a variable to the reset button
const stepBtn = document.querySelector("stepBtn")
const clearBtn = document.querySelector("clearBtn")
const randomBtn = document.querySelector("randomBtn")
const gameWidth = gameBoard.width; // Sets the canvas's width
const gameHeight = gameBoard.height; // Sets the canvas's height
const boardBackground = "white"; // Sets the color of the canvas's background
const unitSize = 25; // Sets the pixel size of how big everything within the canvas will be
let running = false // Set up so that the game starts stopped (when false, game is not currently running)
let randomCellPlacementX; // The X variable for the random cell placements on the grid vertically
let randomCellPlacementY; // The Y variable for the random cell placements on the grid horizontally
let generation = 0;
let initCellConfig = [ // Sets up the initial configuration of the cells as an array of objects
    {x: unitSize *4, y:0},
    {x: unitSize *3, y:0},
    {x: unitSize *2, y:0},
    {x: unitSize, y:0},
    {x:0, y:0}
]

resetBtn.addEventListener("click", resetGame)
clearBtn.addEventListener()
stepBtn.addEventListener("click", stepGame)
