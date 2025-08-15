class Particle {
  private rays: Ray[] = [];
  private position: p5.Vector;

  constructor(x: number, y: number, numberOfLines: number) {
    this.position = createVector(x, y);

    const angle = TWO_PI / numberOfLines;
    for (let i = 0; i < TWO_PI; i += angle) {
      this.rays.push(new Ray(this.position, i));
    }
  }

  draw() {
    for (const ray of this.rays) {
      ray.draw();
    }
  }
}
