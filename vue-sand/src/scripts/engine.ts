// Default canvas attributes
const WIDTH = 500
const HEIGHT = 500

// Dedfault pixel attributes
const PIXEL_WIDTH = 5
const PIXEL_HEIGHT = 5

// Global variables
let ctx: CanvasRenderingContext2D | null
let canvasArray: number[][] = [[]]
let then = Date.now();
let now = Date.now();
let delta: number
let fps = 240;
let interval = 1000 / fps;

// Init canvas
// Used to initialize the canvas element with the correct attributes
const initCanvas = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.background = 'black'
    return canvas
}

// Draw a pixel at a specific coordinate based on the pixel attributes
const drawPixelCoordinate = (x: number, y: number, color: string) => {
    if (!ctx) return
    ctx.fillStyle = color
    ctx.fillRect(x, y, PIXEL_WIDTH, PIXEL_HEIGHT) // x, y, width, height
}

// Returns a cleared 2D array with only 0's
// This is used to store states and create new states
// for the updated canvas
const clearCanvasArray = () => {
    let array: number[][] = [[]]
    let rows = Math.floor(WIDTH / PIXEL_WIDTH)
    let columns = Math.floor(HEIGHT / PIXEL_HEIGHT)

    for (let row = 0; row < rows; row++) {
        array[row] = new Array(columns) // Make sure we have an array at each row, otherwise we can't push values there
        for (let column = 0; column < array[row].length; column++) {
            array[row][column] = 0
        }
    }
    return array
}

// Draw function
// Used to draw ther pixels on the canvas
// based on the canvasArray and given attributes
const draw = () => {
    if (!ctx) return
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    for (let row = 0; row < canvasArray.length; row++) {
        for (let column = 0; column < canvasArray[row].length; column++) {
            if (canvasArray[row][column] == 1) {
                drawPixelCoordinate(row * PIXEL_WIDTH, column * PIXEL_HEIGHT, "yellow")
            }
        }
    }
}

// Update function
// Used to update the canvasArray and create a new state
const update = () => {


    let newEmptyCanvasArray: number[][] = clearCanvasArray() //Creates a new empty canvasArray
    for (let row = 0; row < canvasArray.length; row++) { //Loops through the "row"-array
        for (let column = 0; column < canvasArray[row].length; column++) { //Loops through the "column"-array

            let randomDiagonal = 1;    //
            if (Math.random() < 0.5) { // Generates random number, either -1 or 1
                randomDiagonal *= -1;  //
            }

            let pixel = canvasArray[row][column] //Declares point in array as pixel

            if (pixel != 0) { //Checks wether pixel is falling entity or not
                let below = canvasArray[row][column + 1]
                let belowLeft = -1
                let belowRight = -1
                if (canvasArray[row - randomDiagonal][column + 1] != undefined) {
                    belowLeft = canvasArray[row - randomDiagonal][column + 1]
                } else if (canvasArray[row + randomDiagonal][column + 1] != undefined) {
                    belowRight = canvasArray[row + randomDiagonal][column + 1]
                } //Declares belowLeft and belowRight so that neither is undefined when code is ran

                if (below == 0) { //Checks if pixel below is empty
                    newEmptyCanvasArray[row][column + 1] = pixel
                } else if (belowLeft == 0) { //Checks if pixel below and left is empty
                    newEmptyCanvasArray[row - randomDiagonal][column + 1] = pixel
                } else if (belowRight == 0) { //Checks if pixel below and right is empty
                    newEmptyCanvasArray[row + randomDiagonal][column + 1] = pixel
                } else { //Checks if pixel cant move and in that case will add a pixel at that point
                    newEmptyCanvasArray[row][column] = pixel
                }

            }
        }
    }
    canvasArray = newEmptyCanvasArray
}





const gameLoop = () => {
    // Perform updates and draw functions
    window.requestAnimationFrame(gameLoop);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        update()
        draw()
    }
}

export const initEngine = () => {
    const canvas = initCanvas()
    ctx = canvas.getContext('2d')
    canvasArray = clearCanvasArray()

    if (ctx != null) {
        // Inital pixel to test
        canvasArray[50][0] = 1
        canvasArray[50][50] = 1
    }

    gameLoop()

}
