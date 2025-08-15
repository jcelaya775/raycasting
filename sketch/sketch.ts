function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER).noFill().frameRate(60);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  const particle = new Particle(windowWidth / 2, windowHeight / 2, 50);
  particle.draw();
}
