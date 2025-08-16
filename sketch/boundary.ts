class Boundary {
  x1: number;
  y1: number;
  x2: number;
  y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    push();
    stroke("red");
    strokeWeight(2);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }
}
