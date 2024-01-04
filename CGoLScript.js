const gameBoard = document.querySelector("#gameBoard"); // Assigns a variable defining the gameboard (the canvas)
const ctx = gameBoard.getContext("2d"); // 
const generationCount = document.querySelector("#generationCount"); // Assigns a variable to the generation counter
const startStopBtn = document.querySelector("startstopBtn")
const stepBtn = document.querySelector("stepBtn")
const clearBtn = document.querySelector("clearBtn")
const randomBtn = document.querySelector("randomBtn")
const drawBtn = document.querySelector("drawBtn")
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
let i = 0


clearBtn.addEventListener("click", clearGame)
stepBtn.addEventListener("click", stepGame)
randomBtn.addEventListener("click", randomizeGame)
drawBtn.addEventListener("click", drawCells)
startStopBtn.addEventListener("click")

randomCellPlacements();
createLiveCells();
displayLiveCells();
gameStart();

function gameStart() {};
function nextTick() {};
function clearBoard() {};
function randomCellPlacements() {
    CellX = randomCell(0, gameWidth - unitSize);
    CellY = randomCell(0, gameWidth - unitSize);
};
function createLiveCells() {
    function randomizeLiveCells(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    };
    randomCellPlacements()
}; 
function displayLiveCells() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(CellX, CellY, unitSize, unitSize);
};
function drawGrid() {};
function resetGame() {};
