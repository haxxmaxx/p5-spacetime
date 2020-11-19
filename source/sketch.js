let w;
let h;
let solarSystem;

const planetblue = {
  planet: {
    color: '#25a7cf',
    size: 50,
    revRadius: 200,
    revTime: 5000,
  },
  moon: {
    color: '#f5eec6',
    size: 15,
    revRadius: 50,
    revTime: 2000,
  },
}
const planetGreen = {
  planet: {
    color: '#43d145',
    size: 60,
    revRadius: 400,
    revTime: 6000,
  },
  moon: {
    color: '#aed6ae',
    size: 20,
    revRadius: 60,
    revTime: 3000,
  },
}
const planetOrange = {
  planet: {
    color: '#fa9b1e',
    size: 90,
    revRadius: 600,
    revTime: 8000,
  },
  moon: {
    color: '#ffe294',
    size: 30,
    revRadius: 100,
    revTime: 2000,
  },
}
const planetPurple = {
  planet: {
    color: '#a657eb',
    size: 30,
    revRadius: 800,
    revTime: 10000,
  },
  // moon: {
  //   color: '#f5eec6',
  //   size: 60,
  //   revRadius: 120,
  //   revTime: 3000,
  // },
}

const planetList = [
  planetblue,
  planetGreen,
  planetOrange,
  planetPurple,
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
      size: 150,
      x: w/2,
      y: h/2,
    }
  ];
}

const createPlanetWithMoon = (planetMeta) => {
  const planet = createBody(planetMeta.planet);
  if (planetMeta.moon) {
    const moon = createBody(planetMeta.moon, planet.x, planet.y);
    const moonRevTime = planetMeta.moon.revTime
  
    return millis() % moonRevTime >= moonRevTime / 2 ? [planet, moon] : [moon, planet];
  }
  
  return [planet];
}

const createBody = (meta,  x0 = w/2 , y0 = h/2) => {
  const { color, size, revRadius, revTime } = meta;
  return {
    color, 
    size,
    x: x0 + revRadius * Math.cos(2 * PI * millis() / revTime),
    y: y0 - revRadius / 4 * Math.sin(2 * PI * millis() / revTime),
  }
}

const buildSolarSystem = () => {
  planetList.forEach(planetMeta => {
    planetMoonPair = createPlanetWithMoon(planetMeta);
    const planetRevTime = planetMeta.planet.revTime

    solarSystem = millis() % planetRevTime >= planetRevTime / 2 ?
      solarSystem.concat(planetMoonPair) :
      planetMoonPair.concat(solarSystem);
  });
}

const drawBody = ({ color, size, x, y }) => {
  fill(color);
  ellipse(x, y, size, size);
}

function draw() {
  background(0);
  resetSolarSystem();
  
  // build solarsystem
  buildSolarSystem();
  
  // draw bodies
  solarSystem.forEach(circle => drawBody(circle));
}
