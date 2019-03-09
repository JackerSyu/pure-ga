// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

function Coin(t) {
  this.spacing = 100;
  this.top = t;
  // this.top = t;
  // this.bottom = b;
  this.x = width;
  this.w = 20;
  this.speed = 6;

  this.highlight = false;

  this.hits = function(bird) {
    if (bird.y >= this.top - 20 && bird.y <= this.top +20) {
      if (bird.x > this.x && bird.x < this.x + this.w){
        this.highlight = true;
        return true;
    }
  }
    this.highlight = false;
    return false;
  }

  this.show = function() {
    fill(255);
    if (this.highlight) {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.top, this.w, this.w);
    // rect(this.x, 0, this.w, this.top);
    // rect(this.x, height-this.bottom, this.w, this.bottom);
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }


}
