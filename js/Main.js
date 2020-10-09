// save the canvas for dimensions, and its 2d context for drawing to it
let canvas, canvasContext;

let p1 = new Car();
let p2 = new Car();
let firstTime = true;
let speedBuffer = false;
let computerCar = true;
let startTimestamp;
const TICKS_PER_SECOND = 30;
const SKIP_TICKS = 1000 / TICKS_PER_SECOND;
const MAX_FRAMESKIP = 5;
let nextGameTick = 0;
let loadTimestamp = Date.now();
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadDayImages();
}

function getTickCount() {
    return Date.now() - loadTimestamp;
}

function renderFrame() {
    let loops = 0;
    while (getTickCount() > nextGameTick && loops < MAX_FRAMESKIP) {
        moveEverything();
        nextGameTick += SKIP_TICKS;
        loops++;
    }
    let interpolation = (getTickCount() + SKIP_TICKS - nextGameTick) / SKIP_TICKS;
    drawEverything(interpolation);
    requestAnimationFrame(renderFrame);
}

function loadingDoneSoStartGame() {
    p2.init(car2Pic, "Green Car");
    p1.init(carPic, "Blue Car");
    initInput();
    renderFrame();
    setInterval(function () {
        if (computerCar) {
            moveComputer();
        }
    }, 2000);
}

function moveEverything() {
    p1.move();
    p2.move();
}

function drawEverything(interpolation) {
    drawTracks();
    p1.draw(interpolation);
    p2.draw(interpolation);
    let nowTimestamp = Date.now();
    let differenceMs = nowTimestamp - startTimestamp;
    let minutes = pad(Math.floor(differenceMs / 60000), 2);
    let seconds = pad(((differenceMs % 60000) / 1000).toFixed(1), 4);
    let raceTime = minutes + ":" + seconds;
    canvasContext.font = "30px Verdana";
    canvasContext.fillStyle = 'blue';
    canvasContext.fillText(raceTime, canvas.width - 130, 30);
}

function isCarAtPixelCoord(myCar, pixelX, pixelY) {
    let whatCar;
    if (myCar === p1) {
        whatCar = p2;
    }
    else {
        whatCar = p1;
    }
    if ((pixelX > whatCar.x - 21 && pixelX < whatCar.x + 21) && (pixelY > whatCar.y - 21 && pixelY < whatCar.y + 21)) {
        if (!speedBuffer) {
            myCar.carSpeed = myCar.carSpeed * -1.5;
            speedBuffer = true;
        }
    }
    else {
        speedBuffer = false;
    }
}

function moveComputer() {
    let randomKey = Math.floor((Math.random() * 4) + 1);
    switch (randomKey) {
        case 1:
            p2.keyHeld_Gas = !p2.keyHeld_Gas;
            break;
        case 2:
            p2.keyHeld_Reverse = !p2.keyHeld_Reverse;
            break;
        case 3:
            p2.keyHeld_TurnLeft = !p2.keyHeld_TurnLeft;
            break;
        case 4:
            p2.keyHeld_TurnRight = !p2.keyHeld_TurnRight;
            break;
    }
}

function pad(num, size) {
    let s = "000000000" + num;
    return s.substr(s.length - size);
}

function resetTime() {
    startTimestamp = Date.now();
}