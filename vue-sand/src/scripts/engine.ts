const WIDTH = 500
const HEIGHT = 500

const SAND_WIDTH = 5
const SAND_HEIGHT = 5
const SAND_COLOR = 'yellow'

let then = Date.now();
let now = Date.now();
let delta: number
let fps = 240;
let interval = 1000 / fps;

const initCanvas = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.width = WIDTH
    canvas.height = HEIGHT
    canvas.style.border = '1px solid black'
    canvas.style.background = 'black'
    return canvas
}

const drawSandAtCoordinates = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = SAND_COLOR
    ctx.fillRect(x, y, SAND_WIDTH, SAND_HEIGHT)
}

const draw = () => {
    // Todo
}

const update = () => {
    console.log('update', delta);
    // Todo
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
    const ctx = canvas.getContext('2d')

    if (ctx != null) {
        drawSandAtCoordinates(ctx, 0, 0)
    }

    gameLoop()

}