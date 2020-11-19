let solarSystem;
let planetList;

function resetSolarSystem() {
    solarSystem = [
        {
            color: '#fcdf3a',
            size: 150,
            x: w/2,
            y: h/2,
        }
    ];
    planetList = [
        JSON.parse(JSON.stringify(planetblue)),
        JSON.parse(JSON.stringify(planetGreen)),
        JSON.parse(JSON.stringify(planetOrange)),
        JSON.parse(JSON.stringify(planetPurple)),
    ]
}

function modifyParameters() {
    const sizeFactor = mouseY / 400;
    console.log(sizeFactor)
    const speedFactor = 100 / (mouseX - w/2);

    solarSystem[0].size *= sizeFactor;
    planetList.forEach((planet) => {
        planet.planet.size *= sizeFactor;
        planet.planet.revRadius *= sizeFactor;
        planet.planet.revTime *= speedFactor;

        if (planet.moon) {
            planet.moon.size *= sizeFactor;
            planet.moon.revRadius *= sizeFactor;
            planet.moon.revTime *= speedFactor;
        }
    });
}

function createPlanetWithMoon(planetMeta) {
    const planet = createBody(planetMeta.planet);

    if (planetMeta.moon) {
        const moonMeta = planetMeta.moon;
        const moon = createBody(moonMeta, planet.x, planet.y);
        let isInFront = millis() % abs(moonMeta.revTime) >= abs(moonMeta.revTime) / 2;
        moonMeta.revTime < 0 && (isInFront = !isInFront);

        if (!moonMeta.double) {
            return isInFront ? [planet, moon] : [moon, planet];
        } else {
            const moonOpposite = createBody(moonMeta, planet.x, planet.y, PI)
            return isInFront ? [moonOpposite, planet, moon] : [moon, planet, moonOpposite];
        }
    }

    return [planet];
}

function rotateMoon(x0, y0, angle, coord) {
    const s = Math.sin(angle);
    const c = Math.cos(angle);
    // translate point back to origin:
    coord.x -= x0;
    coord.y -= y0;
    // rotate point
    const xRot = coord.x * c - coord.y * s;
    const yRot = coord.x * s + coord.y * c;
    // translate point back:
    coord.x = xRot + x0;
    coord.y = yRot + y0;
}

function createBody(meta, x0 = w/2, y0 = h/2, phase = 0 ) {
    const { rotating, color, size, revRadius, revTime } = meta;
    let radiusDialationX = 1;
    let radiusDialationY = .25;
    const angle = (TWO_PI * millis() / revTime + phase);
    const coord = {
        x: x0 + revRadius * radiusDialationX * Math.cos(angle),
        y: y0 - revRadius * radiusDialationY * Math.sin(angle),
    }

    if (rotating) {
        rotateMoon(x0, y0, angle / 20 + PI, coord);
    }
    
    return {
        color, 
        size,
        x: coord.x,
        y: coord.y,
    }
}

function buildSolarSystem() {
    planetList.forEach(planetMeta => {
        planetMoonPair = createPlanetWithMoon(planetMeta);
        const revTime = planetMeta.planet.revTime;
        let isInFront = millis() % abs(revTime) >= abs(revTime) / 2;
        revTime < 0 && (isInFront = !isInFront);

        solarSystem = isInFront ? solarSystem.concat(planetMoonPair) : planetMoonPair.concat(solarSystem);
    });
}

function drawBody({ color, size, x, y }) {
    fill(color);
    ellipse(x, y, size, size);
}