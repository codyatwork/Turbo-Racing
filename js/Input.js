/**
 * Keyboard keycode constants, determined by printing out evt.keyCode from a key handler
 */
const CONTROL_KEYS = {
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    LETTER_W: 87,
    LETTER_A: 65,
    LETTER_S: 83,
    LETTER_D: 68
}

function initInput() {
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

    p1.setupControls(CONTROL_KEYS.UP_ARROW, CONTROL_KEYS.DOWN_ARROW, CONTROL_KEYS.LEFT_ARROW, CONTROL_KEYS.RIGHT_ARROW);
    p2.setupControls(CONTROL_KEYS.LETTER_W, CONTROL_KEYS.LETTER_S, CONTROL_KEYS.LETTER_A, CONTROL_KEYS.LETTER_D);
}

function setKeyHoldState(thisKey, thisCar, setTo) {
    if (thisKey === thisCar.controlKeyForTurnLeft) {
        thisCar.keyHeld_TurnLeft = setTo;
    }
    if (thisKey === thisCar.controlKeyForTurnRight) {
        thisCar.keyHeld_TurnRight = setTo;
    }
    if (thisKey === thisCar.controlKeyForGas) {
        thisCar.keyHeld_Gas = setTo;
    }
    if (thisKey === thisCar.controlKeyForReverse) {
        thisCar.keyHeld_Reverse = setTo;
    }
}

function keyPressed(evt) {
    if (evt.keyCode === 84) {
        if (sunOut) {
            loadNightImages();
        }
        else {
            loadDayImages();
        }
        firstTime = false;
    }
    else if (evt.keyCode === 67) {
        computerCar = !computerCar;
        p2.keyHeld_Gas = false;
        p2.keyHeld_Reverse = false;
        p2.keyHeld_TurnLeft = false;
        p2.keyHeld_TurnRight = false;
    }
    else if (evt.keyCode === 18) {
        p1.nitro();
    }
    else if (evt.keyCode === 32) {
        p2.nitro();
    }
    setKeyHoldState(evt.keyCode, p1, true);
    setKeyHoldState(evt.keyCode, p2, true);
    // without this, arrow keys scroll the browser!
    if (Object.values(CONTROL_KEYS).includes(evt.keyCode)) evt.preventDefault();
}

function keyReleased(evt) {
    setKeyHoldState(evt.keyCode, p1, false);
    setKeyHoldState(evt.keyCode, p2, false);
}