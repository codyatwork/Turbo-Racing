// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new carClass();
var p2 = new carClass();
var firstTime = true;
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadDayImages();
}

function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);
    p2.carInit(car2Pic, "Green Car");
    p1.carInit(carPic, "Blue Car");
    initInput();
}

function moveEverything() {
    p1.carMove();
    p2.carMove();
    if((p1.carX > p2.carX - 10 && p1.carX < p2.carX + 10) && (p1.carY > p2.carY - 10 && p1.carY < p2.carY + 10)){
    	//TODO nudge the cars apart
    }
}

function drawEverything() {
    drawTracks();

    p1.carDraw();
    p2.carDraw();
}

function isCarAtPixelCoord(myCar, pixelX, pixelY) {
	var whatCar;
	if(myCar==p1){
		whatCar=p2;
	}
	else{
		whatCar=p1;
	}
    if((pixelX > whatCar.carX - 10 && pixelX < whatCar.carX + 10) && (pixelY > whatCar.carY - 10 && pixelY < whatCar.carY + 10)){
    	myCar.carSpeed = myCar.carSpeed * -1.5;
    }
}