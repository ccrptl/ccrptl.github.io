/*
https://vimeo.com/channels/learningp5js/138935677
*/
//processing based code modified for p5.js

p5.disableFriendlyErrors = true;

var num = 600,
     frms = 110,
     z = 20;
var angle = 0,
     theta = 0;

var value = 0;

function setup() {
     createCanvas(windowWidth, windowHeight);
     noStroke();
     fill(255, 10, 100);
}

function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
     if (value === 0) {
          value = 255;
     } else {
          value = 0;
     }
}

function draw() {

     background(0);

     if (value === 0) {
          fill(255, 10, 100);
          translate(width / 2, height / 2);
          // The amount of layers
          for (var j = 20; j < 120; j += 20) {
               var h = j * 2 + 5;
               // The amount of shapes per layer
               for (var q = 0; q < 360; q += 30) {
                    var x2 = sin(radians(q + h)) * j;
                    var y2 = cos(radians(q + h)) * j;
                    var d = map(dist(x2, y2, 0, 0), 0, 120, 0, 360);
                    push();
                    translate(x2, y2);
                    scale(map(j, 0, 180, 0.1, 0.4));
                    rotate(radians(-q - h));

                    beginShape();
                    // The shape, made from openprocessing.org/sketch/162912
                    for (var i = 0; i < 180; i += 5) {
                         var x = sin(radians(i)) * i / 3;
                         var angle = sin(radians(i + frameCount * 3 + d)) * 50;
                         vertex(x - angle, i * 2);
                    }
                    for (var k = 180; k > 0; k -= 5) {
                         x = sin(radians(k)) * k / 3;
                         angle = sin(radians(k + frameCount * 3 + d)) * 50;
                         vertex(-x - angle, k * 2);
                    }
                    endShape(CLOSE);
                    pop();
               }
          }
     } else {
          translate(width / 2, height / 2);

          var m = height / 2;
          for (i = 0; i < z; i++) {

               f = (i % 2 === 0) ? [255, 10, 100] : 0;
               drawThing(m - (m * .95 / z * i), f, i);
          }

          theta += TWO_PI / frms;
          //if (frameCount<frms) saveFrame("img/image-###.gif");
     }

}



function drawThing(diam, col, n) {
     fill(col);
     beginShape();
     var d = 0;
     for (var i = 0; i < num; i++) {
          var offSet = PI / z * n;
          var angle = TWO_PI / num * i;
          var s = 0.7 + 0.4 * sin(sq(offSet) + theta + angle * 4.0);
          d = 0.25 + 0.2 * pow(s, 0.8);
          d += 0.08 * pow(0.5 + 0.5 + cos(4 * angle), 1.0);
          var x = cos(angle) * d * diam;
          var y = sin(angle) * d * diam;
          vertex(x, y);
     }
     endShape(CLOSE);
}