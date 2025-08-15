class Ray {
  private position: p5.Vector;
  private direction: number;

  constructor(position: p5.Vector, direction: number) {
    this.position = position;
    this.direction = direction;
  }

  draw() {
    push();
    stroke(255);
    line(
      this.position.x,
      this.position.y,
      this.position.x + cos(this.direction) * 1000,
      this.position.y + sin(this.direction) * 1000,
    );
    pop();
  }
}
