// car tuning constants
const GROUNDSPEED_DECAY_MULT = 0.94;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = 0.03;
const MIN_TURN_SPEED = 0.5;
const NITRO_TIME = 20;

class Car {
    constructor() {
        // variables to keep track of car position
        this.x = 75;
        this.y = 75;

        // keyboard hold state variables, to use keys more like buttons
        this.keyHeld_Gas = false;
        this.keyHeld_Reverse = false;
        this.keyHeld_TurnLeft = false;
        this.keyHeld_TurnRight = false;

        this.nitroCount = 0;
    }

    /**
     * Key controls used for this car
     * @param {number} forwardKey Keycode that will make the car go forward
     * @param {number} backKey Keycode that will make the car go backward
     * @param {number} leftKey Keycode that will make the car go left
     * @param {number} rightKey Keycode that will make the car go right
     */
    setupControls(forwardKey, backKey, leftKey, rightKey) {
        this.controlKeyForGas = forwardKey;
        this.controlKeyForReverse = backKey;
        this.controlKeyForTurnLeft = leftKey;
        this.controlKeyForTurnRight = rightKey;
    };

    init(whichGraphic, whichName) {
        this.myBitmap = whichGraphic;
        this.myName = whichName;
        this.reset();
    }

    reset() {
        this.speed = 0;
        this.ang = -0.5 * Math.PI;
        if (this.homeX === undefined) {
            for (let i = 0; i < trackGrid.length; i++) {
                if (trackGrid[i] === TRACK_PLAYER) {
                    let tileRow = Math.floor(i / TRACK_COLS);
                    let tileCol = i % TRACK_COLS;
                    this.homeX = tileCol * TRACK_W + 0.5 * TRACK_W;
                    this.homeY = tileRow * TRACK_H + 0.5 * TRACK_H;
                    trackGrid[i] = TRACK_ROAD;
                    break; // found it, so no need to keep searching 
                } // end of if
            } // end of for
        } // end of if car position not saved yet
        this.x = this.homeX;
        this.y = this.homeY;
        resetTime();
        this.hasNitro = true;
    }; // end of carReset

    move() {
        // only allow the car to turn while it's rolling
        if (Math.abs(this.speed) > MIN_TURN_SPEED) {
            if (this.keyHeld_TurnLeft) {
                this.ang -= TURN_RATE * Math.PI;
            }

            if (this.keyHeld_TurnRight) {
                this.ang += TURN_RATE * Math.PI;
            }
        }

        if (this.keyHeld_Gas) {
            this.speed += DRIVE_POWER;
        }
        if (this.keyHeld_Reverse) {
            this.speed -= REVERSE_POWER;
        }
        if (this.nitroCount > 1) {
            this.nitroCount--;
            this.speed = this.nitroSpeed;
        }
        else if (this.nitroCount === 1) {
            this.speed = this.speed / 2;
            this.nitroCount--;
        }
        let nextX = this.x + Math.cos(this.ang) * this.speed;
        let nextY = this.y + Math.sin(this.ang) * this.speed;

        let drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);
        isCarAtPixelCoord(this, this.x, this.y);

        if (drivingIntoTileType === TRACK_ROAD) {
            this.x = nextX;
            this.y = nextY;
        } else if (drivingIntoTileType === TRACK_GOAL) {
            document.getElementById("debugText").innerHTML = this.myName + " won the race";
            p1.reset();
            p2.reset();
        } else if (drivingIntoTileType === TRACK_GRASS) {
            this.speed = this.speed / 2;
            this.x = nextX;
            this.y = nextY;
        } else if (drivingIntoTileType === TRACK_OIL) {
            this.keyHeld_TurnLeft = false;
            this.keyHeld_TurnRight = false;
            this.x = nextX;
            this.y = nextY;
        } else {
            this.speed = 0.0;
        }

        this.speed *= GROUNDSPEED_DECAY_MULT;
    };

    draw() {
        drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
    };

    nitro() {
        if (this.hasNitro) {
            this.nitroCount = NITRO_TIME;
            this.hasNitro = false;
            this.speedCopy = this.speed;
            this.nitroSpeed = this.speed * 2;
        }
    };
} // end of car class