let carPic = document.createElement("img");
let car2Pic = document.createElement("img");
let trackPics = [];

let picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
    picsToLoad--;
    if (picsToLoad === 0) { // last image loaded?
        if (firstTime) {
            loadingDoneSoStartGame();
        }
    }
}

function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImageAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
    trackPics[trackCode] = document.createElement("img");
    beginLoadingImage(trackPics[trackCode], fileName);
}

function loadDayImages() {

    let dayImageList = [{
        varName: carPic,
        theFile: "player1.png"
    },
    {
        varName: car2Pic,
        theFile: "player2.png"
    },
    {
        trackType: TRACK_ROAD,
        theFile: "track_road.png"
    },
    {
        trackType: TRACK_WALL,
        theFile: "track_wall.png"
    },
    {
        trackType: TRACK_GOAL,
        theFile: "track_goal.png"
    },
    {
        trackType: TRACK_TREE,
        theFile: "track_tree.png"
    },
    {
        trackType: TRACK_FLAG,
        theFile: "track_flag.png"
    },
    {
        trackType: TRACK_GRASS,
        theFile: "track_grass_day.png"
    },
    {
        trackType: TRACK_OIL,
        theFile: "track_oil_day.png"
    }
    ];

    picsToLoad = dayImageList.length;

    for (let dayImage of dayImageList) {
        if (dayImage.trackType !== undefined) {
            loadImageForTrackCode(dayImage.trackType, dayImage.theFile);
        } else {
            beginLoadingImage(dayImage.varName, dayImage.theFile);
        } // end of else
    } // end of for dayImageList
    sunOut = true;
} // end of function loadImages

function loadNightImages() {
    let nightImageList = [{
        varName: carPic,
        theFile: "player1_night.png"
    },
    {
        varName: car2Pic,
        theFile: "player2_night.png"
    },
    {
        trackType: TRACK_ROAD,
        theFile: "track_road_night.png"
    },
    {
        trackType: TRACK_WALL,
        theFile: "track_wall_night.png"
    },
    {
        trackType: TRACK_GOAL,
        theFile: "track_goal_night.png"
    },
    {
        trackType: TRACK_TREE,
        theFile: "track_treeWall_night.png"
    },
    {
        trackType: TRACK_FLAG,
        theFile: "track_flagWall_night.png"
    },
    {
        trackType: TRACK_GRASS,
        theFile: "track_grass_night.png"
    },
    {
        trackType: TRACK_OIL,
        theFile: "track_oil_night.png"
    }
    ];
    picsToLoad = nightImageList.length;
    for (let nightImage of nightImageList) {
        if (nightImage.trackType !== undefined) {
            loadImageForTrackCode(nightImage.trackType, nightImage.theFile);
        } else {
            beginLoadingImage(nightImage.varName, nightImage.theFile);
        } // end of else
    } // end of for nightImageList
    sunOut = false;
}