let solarSystem;

function resetSolarSystem() {
    solarSystem = [
        {
            color: '#fcdf3a',
            size: 150,
            x: w/2,
            y: h/2,
        }
    ];
}

function createPlanetWithMoon(planetMeta) {
    const planet = createBody(planetMeta.planet);
    if (planetMeta.moon) {
        const moon = createBody(planetMeta.moon, planet.x, planet.y);
        const moonRevTime = planetMeta.moon.revTime

        return millis() % moonRevTime >= moonRevTime / 2 ? [planet, moon] : [moon, planet];
    }

    return [planet];
}

function createBody(meta,  x0 = w/2 , y0 = h/2) {
    const { color, size, revRadius, revTime } = meta;
    return {
        color, 
        size,
        x: x0 + revRadius * Math.cos(2 * PI * millis() / revTime),
        y: y0 - revRadius / 4 * Math.sin(2 * PI * millis() / revTime),
    }
}

function buildSolarSystem() {
    planetList.forEach(planetMeta => {
        planetMoonPair = createPlanetWithMoon(planetMeta);
        const planetRevTime = planetMeta.planet.revTime

        solarSystem = millis() % planetRevTime >= planetRevTime / 2 ?
        solarSystem.concat(planetMoonPair) :
        planetMoonPair.concat(solarSystem);
    });
}

function drawBody({ color, size, x, y }) {
    fill(color);
    ellipse(x, y, size, size);
}