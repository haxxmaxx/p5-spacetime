let w;
let h;

function setup() {
  // frameRate(1)
  w = windowWidth;
  h = windowHeight;
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  w = windowWidth;
  h = windowHeight;
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(10);
  stroke(10);
  resetSolarSystem();
  modifyParameters();
  
  // Create an array 
  buildSolarSystem();
  
  // draw bodies
  solarSystem.forEach(circle => drawBody(circle));
}
