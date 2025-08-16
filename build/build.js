var Boundary = (function () {
    function Boundary(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    Boundary.prototype.draw = function () {
        push();
        stroke("red");
        strokeWeight(2);
        line(this.x1, this.y1, this.x2, this.y2);
        pop();
    };
    return Boundary;
}());
var Particle = (function () {
    function Particle(x, y, numberOfLines) {
        this.rays = [];
        this.position = createVector(x, y);
        var angle = TWO_PI / numberOfLines;
        for (var i = 0; i < TWO_PI; i += angle) {
            this.rays.push(new Ray(this.position, i));
        }
    }
    Particle.prototype.update = function (x, y) {
        this.position.set(x, y);
    };
    Particle.prototype.draw = function (walls) {
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            var closestIntersectionPoint = void 0;
            var closestIntersectionDistance = Infinity;
            for (var _b = 0, walls_1 = walls; _b < walls_1.length; _b++) {
                var wall = walls_1[_b];
                var intersectionPoint = ray.projectTo(wall);
                if (intersectionPoint) {
                    var currentDistance = dist(this.position.x, this.position.y, intersectionPoint.x, intersectionPoint.y);
                    if (currentDistance < closestIntersectionDistance) {
                        closestIntersectionDistance = currentDistance;
                        closestIntersectionPoint = intersectionPoint;
                    }
                }
            }
            if (closestIntersectionPoint) {
                push();
                stroke(255);
                line(this.position.x, this.position.y, closestIntersectionPoint.x, closestIntersectionPoint.y);
                pop();
            }
            else {
                ray.drawInfinite();
            }
        }
    };
    return Particle;
}());
var Ray = (function () {
    function Ray(position, angle) {
        this.position = position;
        this.direction = p5.Vector.fromAngle(angle);
    }
    Ray.prototype.draw = function () {
        push();
        stroke(255);
        line(this.position.x, this.position.y, this.position.x + this.direction.x * 10, this.position.y + this.direction.y * 10);
        pop();
    };
    Ray.prototype.drawInfinite = function () {
        push();
        stroke(255);
        line(this.position.x, this.position.y, this.position.x + this.direction.x * 1000, this.position.y + this.direction.y * 1000);
        pop();
    };
    Ray.prototype.projectTo = function (wall) {
        var x1 = wall.x1;
        var y1 = wall.y1;
        var x2 = wall.x2;
        var y2 = wall.y2;
        var x3 = this.position.x;
        var y3 = this.position.y;
        var x4 = this.position.x + this.direction.x;
        var y4 = this.position.y + this.direction.y;
        var denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (denominator === 0) {
            return;
        }
        var t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
        var u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;
        if (t >= 0 && t <= 1 && u >= 0) {
            return createVector(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
        }
    };
    return Ray;
}());
var particle;
var walls = [];
var NUM_BOUNDARIES = 5;
function setup() {
    createCanvas(windowWidth, windowHeight);
    particle = new Particle(windowWidth / 2, windowHeight / 2, 100);
    var BOUNDARY_WINDOW_PADDING = 100;
    for (var i = 0; i < NUM_BOUNDARIES; i++) {
        var randomX1 = BOUNDARY_WINDOW_PADDING +
            Math.random() * (windowWidth - BOUNDARY_WINDOW_PADDING);
        var randomY1 = BOUNDARY_WINDOW_PADDING +
            Math.random() * (windowHeight - BOUNDARY_WINDOW_PADDING);
        var randomX2 = BOUNDARY_WINDOW_PADDING +
            Math.random() * (windowWidth - BOUNDARY_WINDOW_PADDING);
        var randomY2 = BOUNDARY_WINDOW_PADDING +
            Math.random() * (windowHeight - BOUNDARY_WINDOW_PADDING);
        walls.push(new Boundary(randomX1, randomY1, randomX2, randomY2));
    }
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    for (var _i = 0, walls_2 = walls; _i < walls_2.length; _i++) {
        var boundary = walls_2[_i];
        boundary.draw();
    }
    particle.update(mouseX, mouseY);
    particle.draw(walls);
}
//# sourceMappingURL=build.js.map