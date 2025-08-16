class Particle {
  private rays: Ray[] = [];
  private position: p5.Vector;

  constructor(x: number, y: number, numberOfLines: number) {
    this.position = createVector(x, y);

    let deltaTheta = TWO_PI / numberOfLines;
    for (let i = 0; i < numberOfLines; i++) {
      const theta = i * deltaTheta;
      this.rays.push(new Ray(this.position, theta));
    }
  }

  update(x: number, y: number) {
    this.position.set(x, y);
  }

  draw(walls?: Boundary[]) {
    for (const ray of this.rays) {
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

      push();
      stroke(255, 100);
      if (closestIntersectionPoint) {
        line(
          this.position.x,
          this.position.y,
          closestIntersectionPoint.x,
          closestIntersectionPoint.y,
        );
      } else {
        ray.drawInfinite();
      }
      pop();
    }
  }
}
