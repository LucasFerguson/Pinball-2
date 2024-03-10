

var ballArray = [];

var line1;

var light;

var polys = [];

var lines = [];

var worldWidth = 500;
var worldHeight = 500;

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (var a = 0; a < 50; a++) {
        ballArray.push(new Ball());
    }



    var pointsA = [
        createVector(47, 38),
        createVector(237, 98),
        createVector(311, 47),
        createVector(481, 47),
        createVector(472, 191),
        createVector(483, 391),
        createVector(420, 377),
        createVector(264, 282),
        createVector(250, 282),
        createVector(240, 300),
        createVector(20, 300)
    ];

    for (var a = 0; a < pointsA.length - 1; a++) {
        lines.push(new Line(pointsA[a], pointsA[a + 1]));
    }

    lines.push(new Line(pointsA[0], pointsA[pointsA.length - 1]));
}


function draw() {
    background(0);

    // translate(windowWidth / 2 , windowHeight / 2);
    /// Don't Draw anything above this ///

    fill(160, 255, 160);
    rect(0, 0, worldWidth, worldHeight);
    
    for (var a = 0; a < polys.length; a++) {
        polys[a].render();
    }

    for (var a = 0; a < lines.length; a++) {
        lines[a].update();
        lines[a].render();
    }

    for (var a = 0; a < ballArray.length; a++) {
        ballArray[a].update();
        ballArray[a].render();
    }

    push();
    fill(0);
    stroke(0);
    strokeWeight(2);
    textSize(25);

    let fps = frameRate();
    textSize(20);
    text("fps = " + Math.round(fps), 50, windowHeight - 20);
    pop();

}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);

    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);

    stroke(255, 255, 255);
    point(vec.x, vec.y);

    pop();
}

class Line {
    constructor(point1, point2) {
        this.p1 = point1;
        this.p1H = false;
        this.p2 = point2;
        this.p2H = false;
    }

    render() {
        push();
        stroke(0);
        fill(0);
        strokeWeight(4);

        line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

        strokeWeight(10);
        stroke(255, 255, 255);
        noFill();

        if (this.p1H) {
            ellipse(this.p1.x, this.p1.y, 10, 10);
        }
        if (this.p2H) {
            ellipse(this.p2.x, this.p2.y, 10, 10);
        }


        pop();
    }

    update() {
        let d1 = dist(this.p1.x, this.p1.y, mouseX, mouseY);

        if (d1 < 10) {
            this.p1H = true;
        } else {
            this.p1H = false;
        }

        let d2 = dist(this.p2.x, this.p2.y, mouseX, mouseY);
        if (d2 < 10) {
            this.p2H = true;
        } else {
            this.p2H = false;
        }

        if (mouseIsPressed) {
            if (this.p1H) {
                this.p1 = createVector(mouseX, mouseY);
            } else if (this.p2H) {
                this.p2 = createVector(mouseX, mouseY);
            }
        }
    }
}


