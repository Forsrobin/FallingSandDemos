// Default canvas attributes
const WIDTH = 500
const HEIGHT = 500

// Dedfault pixel attributes
const PIXEL_WIDTH = 10
const PIXEL_HEIGHT = 10

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
    let xCounter = Math.floor(WIDTH / PIXEL_WIDTH)
    let yCounter = Math.floor(HEIGHT / PIXEL_HEIGHT)

    for (let row = 0; row < xCounter; row++) {
        array[row] = [] // Make sure we have an array at each row, otherwise we can't push values there
        for (let column = 0; column < yCounter; column++) {
            array[row][column] = 0
        }
    }
    return array
}

// Draw function
// Used to draw ther pixels on the canvas
// based on the canvasArray and given attributes
const draw = () => {
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

    // Psuedo code

    // Create a new empty canvasArray
    // Loop through canvasArray
    //      If pixel is empty: 
    //          continue
    //      If pixel is a falling entity (Sand, Water, etc.):
    //          If pixel below is occupied:
    //              Set newEmptyCanvasArray at pixel as falling entity (Dont move basically)
    //              continue
    //          If pixel below is empty (not a falling entity):
    //              Set newEmptyCanvasArray at pixel below as the falling entity
    //              continue
    //          If pixel below is sand AND random pixel diagonal below is empty (Diagonal left or right):
    //              Set newEmptyCanvasArray at pixel diagonal below as falling entity
    //              continue
    // Set the canvasArray to the newEmptyCanvasArray


    for (let row = 0; row < canvasArray.length; row++) {
        for (let column = 0; column < canvasArray[row].length; column++) {
            //Check if pixel is Sand
            if (canvasArray[row][column] == 1) {
                //Check if pixel below is Sand, if not, move down one step
                if (canvasArray[row + 1][column] == 1) {

                    continue
                    // Check if right or left of pixel below is Sand
                    // if(canvasArray[row + 1][column + 1])
                }
            }
        }
    }
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
        canvasArray[25][5] = 1
    }

    gameLoop()

}
