// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Bird(i) {
  this.y = height/2;
  this.x = 64;
  this.gravity = 1;
  this.lift = -30;
  this.velocity = 0;
  this.indexBird = i;
  this.frameCountScore = 0;
  this.coinPointSum = 0;
  this.point = 0;
  this.pathArr = [];
  this.show = function() {
    stroke(255);
    fill(255, 100);
    ellipse(this.x, this.y, 32, 32);
  }
  this.path = function(arr) {
    this.pathArr = arr;
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.coinPoint = function() {
    this.coinPointSum += 50;
    this.point += 50;
  }

  this.passPoint = function(fc){
    this.frameCountScore += fc; 
    this.point += fc;
  } 

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

  }

}
