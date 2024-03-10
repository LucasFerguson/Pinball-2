class Ball {
    constructor() {

        this.pos = createVector(200, 200);
        this.vel = createVector(random(1, 3) , random(-1, -3) );
        this.acc = createVector(0, 0);


        this.mass = 2;

        this.height = 10;
        this.width = 10;

        this.radius = 8;

        this.jumping = false;
        this.jumpTime = 0;
        this.canJumpAgain = true;

        this.col = {
            top: false,
            top_cell: 0,

            bottom: false,
            bottom_cell: 0,

            left: false,
            left_cell: 0,

            right: false,
            right_cell: 0
        };

        this.colided = false;
        // this.test = false;
        this.colidedtime = 0;
        this.colidedNumber = 0;
        this.colidedLine = -1;


    }

    update() {

        this.vel.add(this.acc);

        var spos = this.vel;
        var spos = this.pos;

        // var endPos = spos.add(spos);

        var magtoFixed = Math.floor(this.vel.copy().mag().toFixed(0));
        // console.log(magtoFixed );
        var magVel = this.vel.copy();
        magVel = p5.Vector.div(magVel, magtoFixed);
        // magVel.div(magtoFixed);

        this.colided = false;
        this.colidedtime++;
        var newVel = this.vel;

        for (var i = 0; i < magtoFixed; i++) {
            // this.pos.add(svel.x / Math.abs(svel.x), svel.y / Math.abs(svel.y));

            if (this.colided) {
                break;
            }

            this.pos.add(magVel);

            for (var l = 0; l < lines.length; l++) {

                var lineA = lines[l];

                if (!(this.colidedLine == l) ) {
                    // lineCircle(lineA.p1.x,lineA.p1.y, lineA.p2.x,lineA.p2.y, this.pos.x,this.pos.y, this.radius)
                    // linePoint(lineA.p1.x, lineA.p1.y, lineA.p2.x, lineA.p2.y, this.pos.x, this.pos.y)
                    // lineCircle(x1,y1, x2,y2, cx,cy,r);
                    // linePoint(x1, y1, x2, y2, px, py)
                    //linePoint(lineA.p1, lineA.p2, this.pos)
                    //collideLineCircle(x1, y1, x2, y2, cx, cy, diameter)

                    if (collideLineCircle(lineA.p1.x,lineA.p1.y, lineA.p2.x,lineA.p2.y, this.pos.x, this.pos.y, this.radius) ) {

                        var seg_v = p5.Vector.sub(lineA.p2, lineA.p1);

                        var seg_n = seg_v.copy().rotate(-HALF_PI);
                        seg_n.normalize();
                        // seg_n.mult(20);

                        var light_d = this.vel;

                        var dot = p5.Vector.dot(light_d, seg_n) * 2;

                        var r = p5.Vector.sub(light_d, seg_n.copy().mult(dot));

                        // this.vel = r;
                        newVel = r;

                        // console.log("colided");

                        this.colided = true;
                        this.colidedtime = 0;
                        this.colidedLine = l;
                        this.colidedNumber++;


                    } else {
                        this.colided = false;
                    }
                }

            }



            // this.edge();
        }

        this.vel = newVel;
        this.acc.mult(0);

        // if (this.colided) {
        //     this.pos.add(this.vel);
        // }
    }

    edge() {
        if (this.pos.x > worldWidth - this.radius) {
            this.vel.x = -1;
        }
        if (this.pos.x < this.radius) {
            this.vel.x = 1;
        }
        if (this.pos.y < this.radius) {
            this.vel.y = 1;
        }
        if (this.pos.y > worldHeight - this.radius) {
            this.vel.y = -1;
        }

    }

    render() {
        push();
        noFill();
        stroke(0, 255, 0);
        point(this.pos.x, this.pos.y);
        //rectMode(CENTER);

        // noStroke();

        if (false) {
            fill(0, 255, 0);
        } else {
            fill(0, 153, 255);
        }

        fill(255);
        stroke(51);
        strokeWeight(2);

        ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);

        strokeWeight(1);
        fill(0);
        stroke(0);
        // text(this.colidedNumber + "  ", this.pos.x, this.pos.y - 30);

        fill(0, 255, 0);
        // text("x " + this.pos.x + "  y " + this.pos.y, this.pos.x, this.pos.y - 30);

        noFill();
        //ellipse(this.pos.x, this.pos.y, 500, 500);

        pop();
    }

    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acc.add(f);
    }

}

// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

    // is either end INSIDE the circle?
    // if so, return true immediately
    let inside1 = pointCircle(x1, y1, cx, cy, r);
    let inside2 = pointCircle(x2, y2, cx, cy, r);
    if (inside1 || inside2) return true;

    // get length of the line
    let distX = x1 - x2;
    let distY = y1 - y2;
    let len = sqrt((distX * distX) + (distY * distY));

    // get dot product of the line and circle
    let dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / pow(len, 2);

    // find the closest point on the line
    let closestX = x1 + (dot * (x2 - x1));
    let closestY = y1 + (dot * (y2 - y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    let onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
    if (!onSegment) return false;

    // optionally, draw a circle at the closest
    // point on the line
    fill(255, 0, 0);
    noStroke();
    // ellipse(closestX, closestY, 20, 20);

    // get distance to closest point
    distX = closestX - cx;
    distY = closestY - cy;
    let distance = Math.sqrt((distX * distX) + (distY * distY));

    if (distance <= r) {
        return true;
    }
    return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {

    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    let distX = px - cx;
    let distY = py - cy;
    let distance = sqrt((distX * distX) + (distY * distY));

    // if the distance is less than the circle's
    // radius the point is inside!
    if (distance <= r) {
        return true;
    }
    return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

    // get distance from the point to the two ends of the line
    let d1 = dist(px, py, x1, y1);
    let d2 = dist(px, py, x2, y2);

    // get the length of the line
    let lineLen = dist(x1, y1, x2, y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    let buffer = 0.01;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range,
    // rather than one # 
    if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {   //d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer
        return true;
    }
    return false;
}