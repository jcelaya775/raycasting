class Ray {
  position: p5.Vector;
  direction: p5.Vector;

  constructor(position: p5.Vector, angle: number) {
    this.position = position;
    this.direction = p5.Vector.fromAngle(angle);
  }

  draw() {
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.direction.x * 10,
      this.position.y + this.direction.y * 10,
    );
  }

  drawInfinite() {
    line(
      this.position.x,
      this.position.y,
      this.position.x + this.direction.x * 1000,
      this.position.y + this.direction.y * 1000,
    );
  }

  projectTo(wall: Boundary) {
    const x1 = wall.x1;
    const y1 = wall.y1;
    const x2 = wall.x2;
    const y2 = wall.y2;

    const x3 = this.position.x;
    const y3 = this.position.y;
    const x4 = this.position.x + this.direction.x;
    const y4 = this.position.y + this.direction.y;

    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
    if (t >= 0 && t <= 1 && u >= 0) {
      return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }
  }
}
