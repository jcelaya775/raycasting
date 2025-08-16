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

  update(x: number, y: number) {
    this.position.set(x, y);
  }

  draw(walls?: Boundary[]) {
    for (const ray of this.rays) {
      // ray.draw();
      let closestIntersectionPoint;
      let closestIntersectionDistance = Infinity;
      for (const wall of walls) {
        const intersectionPoint = ray.projectTo(wall);
        if (intersectionPoint) {
          const currentDistance = dist(
            this.position.x,
            this.position.y,
            intersectionPoint.x,
            intersectionPoint.y,
          );
          if (currentDistance < closestIntersectionDistance) {
            closestIntersectionDistance = currentDistance;
            closestIntersectionPoint = intersectionPoint;
          }
        }
      }

      if (closestIntersectionPoint) {
        push();
        stroke(255);
        line(
          this.position.x,
          this.position.y,
          closestIntersectionPoint.x,
          closestIntersectionPoint.y,
        );
        pop();
      } else {
        ray.drawInfinite();
      }
    }
  }
}
