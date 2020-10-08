// track constants and variables
const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_COLS = 20;
const TRACK_ROWS = 15;
let trackGrid = [4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
    4, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
    1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
    1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
    1, 0, 0, 1, 1, 6, 6, 1, 4, 4, 1, 1, 6, 6, 6, 1, 1, 0, 7, 1,
    1, 0, 0, 1, 6, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 0, 0, 7, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    1, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
    1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
    1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
    1, 1, 5, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 1, 1, 6, 6, 1, 1, 0, 0, 0, 7, 0, 1,
    0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
    1, 1, 5, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 1
];
const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYER = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;
const TRACK_GRASS = 6;
const TRACK_OIL = 7;
let sunOut;

function trackTileToIndex(tileCol, tileRow) {
    return (tileCol + TRACK_COLS * tileRow);
}

function getTrackAtPixelCoord(pixelX, pixelY) {
    let tileCol = pixelX / TRACK_W;
    let tileRow = pixelY / TRACK_H;

    // we'll use Math.floor to round down to the nearest whole number
    tileCol = Math.floor(tileCol);
    tileRow = Math.floor(tileRow);

    // first check whether the car is within any part of the track wall
    if (tileCol < 0 || tileCol >= TRACK_COLS ||
        tileRow < 0 || tileRow >= TRACK_ROWS) {
        return TRACK_WALL; // avoid invalid array access, treat out of bounds as wall
    }

    let trackIndex = trackTileToIndex(tileCol, tileRow);
    return (trackGrid[trackIndex]);
}

function drawTracks() {
    let trackIndex = 0;
    let trackLeftEdgeX = 0;
    let trackTopEdgeY = 0;

    for (let eachRow = 0; eachRow < TRACK_ROWS; eachRow++) { // deal with one row at a time

        trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge

        for (let eachCol = 0; eachCol < TRACK_COLS; eachCol++) { // left to right in each row

            let trackTypeHere = trackGrid[trackIndex]; // getting the track code for this tile        
            canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);

            trackIndex++; // increment which index we're going to next check for in the track
            trackLeftEdgeX += TRACK_W; // jump horizontal draw position to next tile over by tile width

        } // end of for eachCol

        trackTopEdgeY += TRACK_H; // jump horizontal draw position down by one full tile height

    } // end of for eachRow    
} // end of drawTracks()