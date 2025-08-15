var Particle = (function () {
    function Particle(x, y, numberOfLines) {
        this.rays = [];
        this.position = createVector(x, y);
        var angle = TWO_PI / numberOfLines;
        for (var i = 0; i < TWO_PI; i += angle) {
            this.rays.push(new Ray(this.position, i));
        }
    }
    Particle.prototype.draw = function () {
        for (var _i = 0, _a = this.rays; _i < _a.length; _i++) {
            var ray = _a[_i];
            ray.draw();
        }
    };
    return Particle;
}());
var Ray = (function () {
    function Ray(position, direction) {
        this.position = position;
        this.direction = direction;
    }
    Ray.prototype.draw = function () {
        push();
        stroke(255);
        line(this.position.x, this.position.y, this.position.x + cos(this.direction) * 1000, this.position.y + sin(this.direction) * 1000);
        pop();
    };
    return Ray;
}());
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
    var particle = new Particle(windowWidth / 2, windowHeight / 2, 50);
    particle.draw();
}
//# sourceMappingURL=build.js.map