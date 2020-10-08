// save the canvas for dimensions, and its 2d context for drawing to it
let canvas, canvasContext;

let p1 = new Car();
let p2 = new Car();
let firstTime = true;
let speedBuffer = false;
let computerCar = true;
let startTime;
let start_ms;
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadDayImages();
}

function renderFrame() {
    moveEverything();
    drawEverything();
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

function drawEverything() {
    drawTracks();
    p1.draw();
    p2.draw();
    let nowTime = new Date;
    let now_ms = nowTime.getTime();
    let difference_ms = now_ms - start_ms;
    let minutes = pad(Math.floor(difference_ms / 60000), 2);
    let seconds = pad(((difference_ms % 60000) / 1000).toFixed(1), 4);
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
    startTime = new Date;
    start_ms = startTime.getTime();
}