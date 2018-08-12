// --- Your sprites and globals ---
var whale;
var donut = [];
var lastClick = { x: 0, y: 0};
var screenSize = {xMax: 319, yMax: 449};
var score = {
  value: 0,
  redraw: function() { setProperty("score_value", "text", this.value); },
  reset: function () { this.value = 0; this.redraw(); },
  increase: function() { this.value += 1; this.redraw(); }
};
// --- Generic main loop, 50 frames per second ---
start();
onEvent("button_start", "click", function(event) {
  hideElement("button_start");
  timedLoop(20, update);
});
// --- Your game code ---
function start() {
  setProperty("screen1", "background-color", rgb(0, 200, 200));
  setupWhaleSprite();
  setupDonutSprite();
  score.reset();
  onEvent("screen1", "click", function(event) {
    whale.pointTowards(event.x, event.y);
    lastClick.x = event.x;
    lastClick.y = event.y;
  });
}
function update() {
  // Whale
  if (distance(whale, lastClick.x, lastClick.y) > 10) {
    whale.moveSteps(1);
    whale.ifOnEdgeBounce();
  }
  for (var i = 0; i < donut.length; i += 1) {
    updateVisibleDonut(i);
  }
}
function updateVisibleDonut(i) {
  if (!getProperty(donut[i].costume, "hidden")) {
    donut[i].moveSteps(2);
    donut[i].turn(pickRandom(-5, 5));
    donut[i].ifOnEdgeBounce();
    if (distance(whale, donut[i].xCenter(), donut[i].yCenter()) < 50) {
      donut[i].hide();
      score.increase();
      setTimeout( makeDonutReappear.bind(donut[i]), 3000);
    }
  }
}
function makeDonutReappear() { // Use with a sprite
  this.goto(pickRandom(0, screenSize.xMax), pickRandom(0, screenSize.yMax));
  this.show();
}
function setupWhaleSprite() {
  whale = newSprite({x: 100, y: 100, costumeL: "whaleL", costumeR: "whaleR"});
  setPosition(whale.costumeL, whale.x, whale.y);
  setPosition(whale.costumeR, whale.x, whale.y);
  showElement(whale.costume);
  hideElement(whale.costumeL);
}
function setupDonutSprite() { // donut0, donut1
  var numberOfDonuts = 4;
  for (var i = 0; i < numberOfDonuts; i += 1) {
    var d = newSprite({ x: 50, y: 50, costumeL: "donut" + i, costumeR: "donut" + i, makeDonutReappear: makeDonutReappear });
    setPosition(d.costume, d.x, d.y);
    d.show();
    appendItem(donut, d);
  }
}
// --- Generic Scratch-like sprite functions ---
function newSprite(v) {
  // Sprite variables
  var sprite = v;
  hideElement(v.costumeL);
  v.costume = v.costumeR;
  setPosition(v.costume, v.x, v.y);
  showElement(v.costume);
  sprite.headingX = 1;
  sprite.headingY = 0;
  // Sprite methods
  sprite.goto = goto;
  sprite.hide = hide;
  sprite.ifOnEdgeBounce = ifOnEdgeBounce;
  sprite.moveSteps = moveSteps;
  sprite.pointTowards = pointTowards;
  sprite.show = show;
  sprite.turn = turn;
  sprite.updateCostume = updateCostume;
  sprite.xCenter = getXCenter;
  sprite.yCenter = getYCenter;
  return sprite;
}
function goto(x, y) { // Use with a sprite
  setPosition(this.costume, x, y);
  this.x = x;
  this.y = y;
}
function hide() { // Use with a sprite
  hideElement(this.costume);
}
function ifOnEdgeBounce() { // Use with a sprite
  if (getXPosition(this.costume) < 0
    || getXPosition(this.costume) + getProperty(this.costume, "width") > screenSize.xMax) {
    this.headingX = -this.headingX;
  }
  if (getYPosition(this.costume) < 0
    || getYPosition(this.costume) + getProperty(this.costume, "height") > screenSize.yMax) {
    this.headingY = -this.headingY;
    }
    this.updateCostume();
}
function moveSteps(stepCount) { // Use with a sprite
  this.x += this.headingX * stepCount;
  this.y += this.headingY * stepCount;
  setPosition(this.costume, this.x, this.y);
}
function pickRandom(from, to) {
  return from + Math.random() * (to - from);
}
function pointTowards(x, y) { // Use with a sprite
  var d = distance(this, x, y);
  if (d > 0.0) { // Normalize heading vector to unit length
    this.headingX = (x - this.xCenter()) / d;
    this.headingY = (y - this.yCenter()) / d;
    this.updateCostume();
  }
}
function show() { // Use with a sprite
  showElement(this.costume);
}
// Do the two images' bounding boxes overlap?
// See [1] for a tutorial
function touching(image1, image2) {
  return rangesIntersect(getXPosition(image1), 
    getXPosition(image1) + getProperty(image1, "width"),
    getXPosition(image2),
    getXPosition(image2) + getProperty(image2, "width"))
    && rangesIntersect(getYPosition(image1), 
    getYPosition(image1) + getProperty(image1, "height"),
    getYPosition(image2),
    getYPosition(image2) + getProperty(image2, "height"));
}
function turn(angleDegrees) { // Use with a sprite. See [2] for more details
  var theta = radians(angleDegrees);
  var c = Math.cos(theta);
  var s = Math.sin(theta);
  var xRotated = this.headingX * c - this.headingY * s; 
  var yRotated = this.headingX * s + this.headingY * c;
  this.headingX = xRotated;
  this.headingY = yRotated;
}
// --- Generic helper functions ---
function distance(sprite, x, y) {
  // Pixels between a sprite's center and (x, y) 
  return Math.pow(
    Math.pow(sprite.xCenter() - x, 2.0) +
    Math.pow(sprite.yCenter() - y, 2.0),
    0.5);
}
function getXCenter() { // Use with a sprite
  return getXPosition(this.costume) + getProperty(this.costume, "width") / 2;
}
function getYCenter() { // Use with a sprite
  return getYPosition(this.costume) + getProperty(this.costume, "height") / 2;
}
function updateCostume() { // Use with a sprite
  var wantedCostume;
  if (this.headingX < 0.0) {
    wantedCostume = this.costumeL;
  } else {
    wantedCostume = this.costumeR;
  }
  if (this.costume != wantedCostume && wantedCostume) {
    setPosition(wantedCostume, getXPosition(this.costume), getYPosition(this.costume));
    hideElement(this.costume);
    showElement(wantedCostume);
    this.costume = wantedCostume;
  }
}
function sign(n) { 
  if (n > 0) {
    return 1;
  } else if (n < 0) {
      return -1;
  } else {
    return 0;
  }
}
function radians(degrees) {
  return degrees * Math.PI / 180;
}
// Do [min0, max0] and [min1, max1] overlap?
function rangesIntersect(min0, max0, min1, max1) {
  return Math.max(min0, max0) >= Math.min(min1, max1) &&
    Math.min(min0, max0) <= Math.max(min1, max1);
}
// References
// [1] Coding Math: Episode 14 -- Collision Detection, https://www.youtube.com/watch?v=NZHzgXFKfuY
// [2] Matthew Brett. Formula for rotating a vector in 2D. https://matthew-brett.github.io/teaching/rotation_2d.html
