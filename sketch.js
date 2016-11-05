/*
https://vimeo.com/channels/learningp5js/138935677
*/
//processing based code modified for p5.js

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255, 10, 100,90);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255,255,255,75);
  translate(width/2, height/2);
  // The amount of layers
  for (var j = 20; j < 120; j+=20) {
    var h = j*2+5;
    // The amount of shapes per layer
    for (var q = 0; q < 360; q+=30) {
      var x2 = sin(radians(q+h))*j;
      var y2 = cos(radians(q+h))*j;
      var d = map(dist(x2, y2, 0, 0), 0, 120, 0, 360);
      push();
      translate(x2, y2);
      scale(map(j, 0, 180, 0.1, 0.4));
      rotate(radians(-q-h));
      
      beginShape();
      // The shape, made from openprocessing.org/sketch/162912
      for (var i = 0; i < 180; i+=5) {
        var x = sin(radians(i)) * i/3;
        var angle = sin(radians(i+frameCount*3+d)) * 50;
        vertex(x-angle, i*2);
      }
      for (var k = 180; k > 0; k-=5) {
        x = sin(radians(k)) * k/3;
        angle = sin(radians(k+frameCount*3+d)) * 50;
        vertex(-x-angle, k*2);
      }
      endShape(CLOSE);
      pop();
    }
  }
}