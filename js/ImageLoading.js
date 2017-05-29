var carPic=document.createElement("img");
var car2Pic=document.createElement("img");
var trackPics = [];

var picsToLoad = 0;

function countLoadedImageAndLaunchIfReady() {
  picsToLoad--;
  if(picsToLoad == 0) { // last image loaded?
    loadingDoneSoStartGame();
  }
}

function beginLoadingImage(imgVar, fileName) {
  imgVar.onload=countLoadedImageAndLaunchIfReady;
  imgVar.src="images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
  beginLoadingImage(trackPics[trackCode],fileName);
}

function loadImages() {

var dayImageList = [
  {varName:carPic, theFile:"player1.png"},
  {varName:car2Pic, theFile:"player2.png"},
  {trackType:TRACK_ROAD, theFile:"track_road.png"},
  {trackType:TRACK_WALL, theFile:"track_wall.png"},
  {trackType:TRACK_GOAL, theFile:"track_goal.png"},
  {trackType:TRACK_TREE, theFile:"track_tree.png"},
  {trackType:TRACK_FLAG, theFile:"track_flag.png"},
  {trackType:TRACK_GRASS, theFile:"track_grass_day.png"},
  {trackType:TRACK_OIL, theFile:"track_oil_day.png"}
  ];
var nightImageList = [
  {varName:carPic, theFile:"player1_night.png"},
  {varName:car2Pic, theFile:"player2_night.png"},
  {trackType:TRACK_ROAD, theFile:"track_road_night.png"},
  {trackType:TRACK_WALL, theFile:"track_wall_night.png"},
  {trackType:TRACK_GOAL, theFile:"track_goal_night.png"},
  {trackType:TRACK_TREE, theFile:"track_treeWall_night.png"},
  {trackType:TRACK_FLAG, theFile:"track_flagWall_night.png"},
  {trackType:TRACK_GRASS, theFile:"track_grass_night.png"},
  {trackType:TRACK_OIL, theFile:"track_oil_night.png"}
  ];

picsToLoad = dayImageList.length;

for(var i=0;i<dayImageList.length;i++) {
  if(dayImageList[i].trackType != undefined) {
    loadImageForTrackCode(dayImageList[i].trackType, dayImageList[i].theFile);
  } else {
    beginLoadingImage(dayImageList[i].varName, dayImageList[i].theFile);
  } // end of else
} // end of for dayImageList

} // end of function loadImages
