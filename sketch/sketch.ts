let particle: Particle;
const walls: Boundary[] = [];

const NUM_WALLS = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  particle = new Particle(windowWidth / 2, windowHeight / 2, 360);
  const BOUNDARY_WINDOW_PADDING = 100;
  for (let i = 0; i < NUM_WALLS; i++) {
    const randomX1 =
      BOUNDARY_WINDOW_PADDING +
      Math.random() * (windowWidth - BOUNDARY_WINDOW_PADDING);
    const randomY1 =
      BOUNDARY_WINDOW_PADDING +
      Math.random() * (windowHeight - BOUNDARY_WINDOW_PADDING);
    const randomX2 =
      BOUNDARY_WINDOW_PADDING +
      Math.random() * (windowWidth - BOUNDARY_WINDOW_PADDING);
    const randomY2 =
      BOUNDARY_WINDOW_PADDING +
      Math.random() * (windowHeight - BOUNDARY_WINDOW_PADDING);
    walls.push(new Boundary(randomX1, randomY1, randomX2, randomY2));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (const boundary of walls) {
    boundary.draw();
  }

  particle.update(mouseX, mouseY);
  particle.draw(walls);
}
