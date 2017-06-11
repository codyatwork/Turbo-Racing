// save the canvas for dimensions, and its 2d context for drawing to it
var canvas, canvasContext;

var p1 = new carClass();
var p2 = new carClass();
var firstTime = true;
var speedBuffer = false;
var computerCar = true;
var startTime;
var start_ms;
var activeTrack = trackGrid;
const FRAMES_PER_SECOND = 30;
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    loadDayImages();
}

function loadingDoneSoStartGame() {
    // these next few lines set up our game logic and render to happen 30 times per second
    setInterval(function() {
        moveEverything();
        drawEverything();
    }, 1000 / FRAMES_PER_SECOND);
    p2.carInit(car2Pic, "Green Car");
    p1.carInit(carPic, "Blue Car");
    initInput();
	setInterval(function() {
		if(computerCar){
			moveComputer();
		}
	}, 2000);
}

function moveEverything() {
    p1.carMove();
    p2.carMove();
}

function drawEverything() {
    drawTracks(trackGrid);
    p1.carDraw();
    p2.carDraw();
    var nowTime = new Date;
    var now_ms = nowTime.getTime();
    var difference_ms = now_ms - start_ms;
    var minutes = pad(Math.floor(difference_ms / 60000), 2);
    var seconds = pad(((difference_ms % 60000) / 1000).toFixed(1), 4);
    var raceTime = minutes + ":" + seconds;
    canvasContext.font="30px Verdana";
    canvasContext.fillStyle = 'blue';
    canvasContext.fillText(raceTime, canvas.width-130, 30);
}

function isCarAtPixelCoord(myCar, pixelX, pixelY) {
	var whatCar;
	if(myCar==p1){
		whatCar=p2;
	}
	else{
		whatCar=p1;
	}
    if((pixelX > whatCar.carX - 21 && pixelX < whatCar.carX + 21) && (pixelY > whatCar.carY - 21 && pixelY < whatCar.carY + 21)){
    	if(!speedBuffer){
    		myCar.carSpeed = myCar.carSpeed * -1.5;
    		speedBuffer=true;
    	}
    }
    else{
    	speedBuffer=false;
    }
}

function moveComputer(){
	var randomKey = Math.floor((Math.random() * 4) + 1);
	switch(randomKey){
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
    var s = "000000000" + num;
    return s.substr(s.length-size);
}
function resetTime(){
	startTime = new Date;
	start_ms = startTime.getTime();
}