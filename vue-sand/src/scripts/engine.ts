const WIDTH = 500
const HEIGHT = 500

const PIXEL_WIDTH = 10
const PIXEL_HEIGHT = 10
const PIXEL_COLOR = 'yellow'

let ctx: CanvasRenderingContext2D | null
let canvasArray: number[][] = [[]]

let then = Date.now();
let now = Date.now();
let delta: number
let fps = 240;
let interval = 1000 / fps;

const initCanvas = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.background = 'black'
    return canvas
}

const drawPixelCoordinate = (x: number, y: number, color: string) => {
    if (!ctx) return
    ctx.fillStyle = color
    ctx.fillRect(x, y, PIXEL_WIDTH, PIXEL_HEIGHT)
}

const clearCanvasArray = () => {
    let array: number[][] = [[]]
    let xCounter = Math.floor(WIDTH / PIXEL_WIDTH)
    let yCounter = Math.floor(HEIGHT / PIXEL_HEIGHT)
    for (let row = 0; row < xCounter; row++) {
        array[row] = []
        for (let column = 0; column < yCounter; column++) {
            array[row][column] = 0
        }
    }
    return array
}

const draw = () => {
    for (let row = 0; row < canvasArray.length; row++) {
        for (let column = 0; column < canvasArray[row].length; column++) {
            if (canvasArray[row][column] == 1) {
                drawPixelCoordinate(row * PIXEL_WIDTH, column * PIXEL_HEIGHT, "red")
            }
        }
    }
}

const update = () => {
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
        canvasArray[25][5] = 1
        // drawPIXELAtCoordinates(ctx, 0, 0)
    }

    gameLoop()

}
