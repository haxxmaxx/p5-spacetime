let w;
let h;
let solarSystem;

const planet1 = {
  planet: {
    color: '#25a7cf',
    size: 150,
    revRadius: 600,
    revTime: 5000,
  },
  moon: {
    color: '#f5eec6',
    size: 60,
    revRadius: 120,
    revTime: 3000,
  },
}

const planetList = [
  planet1,
];

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

const resetSolarSystem = () => {
  solarSystem = [
    {
      color: '#fcdf3a',
      size: 300,
      x: w/2,
      y: h/2,
    }
  ];
}

const createPlanetAndMoon = (planetMoonPair) => {
  const planet = createCircle(planetMoonPair.planet);
  const moon = createCircle(planetMoonPair.moon, planet.x, planet.y);
  const moonRevTime = planetMoonPair.moon.revTime
  console.log(millis(), moonRevTime)

  return millis() % moonRevTime >= moonRevTime / 2 ? [planet, moon] : [moon, planet];
}

const createCircle = (meta,  x0 = w/2 , y0 = h/2) => {
  const { color, size, revRadius, revTime } = meta;
  return {
    color, 
    size,
    x: x0 + revRadius * Math.cos(2 * PI * millis() / revTime),
    y: y0 - revRadius / 4 * Math.sin(2 * PI * millis() / revTime),
  }
}

const buildSolarSystem = () => {
  planetList.forEach(planet => {
    planetCoords = createPlanetAndMoon(planet);
    const planetRevTime = planet.planet.revTime

    solarSystem = millis() % planetRevTime >= planetRevTime / 2 ?
      solarSystem.concat(planetCoords) :
      planetCoords.concat(solarSystem);
  });
}

const drawCircle = ({ color, size, x, y }) => {
  fill(color);
  ellipse(x, y, size, size);
}

function draw() {
  background(0);
  resetSolarSystem();
  
  // build solarsystem
  buildSolarSystem();
  
  // draw bodies
  solarSystem.forEach(circle => drawCircle(circle));
}
