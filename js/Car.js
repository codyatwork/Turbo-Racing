// car tuning constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
const NITRO_TIME = 45;

function carClass() {
    // variables to keep track of car position
    this.carX = 75;
    this.carY = 75;

    // keyboard hold state variables, to use keys more like buttons
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_TurnLeft = false;
    this.keyHeld_TurnRight = false;
    
    this.hasNitro = true;
	this.nitroCount = NITRO_TIME;

    // key controls used for this car 
    this.setupControls = function(forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    }

    this.carInit = function(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.carReset();
    }

    this.carReset = function() {
        this.carSpeed = 0;
        this.carAng = -0.5 * Math.PI;
        if (this.homeX == undefined) {
            for (var i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] == TRACK_PLAYER) {
                    var tileRow = Math.floor(i / TRACK_COLS);
                    var tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                    this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                    trackGrid[i] = TRACK_ROAD;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if car position not saved yet
        this.carX = this.homeX;
        this.carY = this.homeY;
        resetTime();
    } // end of carReset

    this.carMove = function() {
        // only allow the car to turn while it's rolling
        if (Math.abs(this.carSpeed) > MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.carAng -= TURN_RATE * Math.PI;
            }

            if (this.keyHeld_TurnRight) {
                this.carAng += TURN_RATE * Math.PI;
            }
        }

        if (this.keyHeld_Gas) {
            this.carSpeed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.carSpeed -= REVERSE_POWER;
        }

        var nextX = this.carX + Math.cos(this.carAng) * this.carSpeed;
        var nextY = this.carY + Math.sin(this.carAng) * this.carSpeed;

        var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);
        isCarAtPixelCoord(this, this.carX, this.carY);

        if (drivingIntoTileType == TRACK_ROAD) {
            this.carX = nextX;
            this.carY = nextY;
        } else if (drivingIntoTileType == TRACK_GOAL) {
            document.getElementById("debugText").innerHTML = this.myName + " won the race";
            p1.carReset();
            p2.carReset();
        } else if (drivingIntoTileType == TRACK_GRASS) {
            this.carSpeed = this.carSpeed / 2;
            this.carX = nextX;
            this.carY = nextY;
        } else if (drivingIntoTileType == TRACK_OIL) {
            this.keyHeld_TurnLeft = false;
            this.keyHeld_TurnRight = false;
            this.carX = nextX;
            this.carY = nextY;
        } else {
            this.carSpeed = 0.0;
        }

        this.carSpeed *= GROUNDSPEED_DECAY_MULT;
    }

    this.carDraw = function() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.carX, this.carY, this.carAng);
    }
    this.nitro = function() {
    	if (this.hasNitro) {
    		this.nitroSpeed = this.carSpeed * 2;
    		this.speedCopy = this.carSpeed;
    		this.countingNitro = true;
    		while(this.nitroCount>0){
    			this.carSpeed = this.nitroSpeed;
    		}
    		this.countingNitro = false;
    		this.carSpeed = this.speedCopy;
    		this.hasNitro = false;
    	}
    }
} // end of car class