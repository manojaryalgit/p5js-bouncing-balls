let balls = [];
let sphereRadius = 200;
let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  for (let i = 0; i < 100; i++) {
    balls.push(new Ball());
  }
}

function draw() {
  background(0, 50);
  rotateX(angleX);
  rotateY(angleY);
  noFill();
  stroke(255);
  sphere(sphereRadius);
  
  for (let ball of balls) {
    ball.update();
    ball.display();
  }
  
  angleX += 0.002;
  angleY += 0.003;
}

class Ball {
  constructor() {
    this.pos = p5.Vector.random3D().mult(random(sphereRadius * 0.8));
    this.vel = p5.Vector.random3D().mult(2);
    this.trail = [];
    this.trailLength = 15;
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    this.pos.add(this.vel);
    if (this.pos.mag() > sphereRadius) {
      let normal = this.pos.copy().normalize();
      this.vel.reflect(normal);
      this.pos.setMag(sphereRadius - 1);
    }
    
    this.trail.push(this.pos.copy());
    if (this.trail.length > this.trailLength) {
      this.trail.shift();
    }
  }

  display() {
    stroke(this.color);
    noFill();
    beginShape();
    for (let i = 0; i < this.trail.length; i++) {
      let alpha = map(i, 0, this.trail.length - 1, 50, 255);
      stroke(this.color.levels[0], this.color.levels[1], this.color.levels[2], alpha);
      vertex(this.trail[i].x, this.trail[i].y, this.trail[i].z);
    }
    endShape();
    
    fill(this.color);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(4);
    pop();
  }
}
