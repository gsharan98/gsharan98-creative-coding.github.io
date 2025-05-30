function setup() {
  createCanvas(800,800);     // creating a 800 *800 canvas
  angleMode(DEGREES);        //using degree for rotation
}

function draw() {
  background(30, 30, 40);    //dark blue color as background 

  // Draw only the main alien
  drawMainAlien(0, 0, 1);
}

function drawMainAlien(x, y, s) {
  push();
  translate(x, y);
  scale(s);

  // Head
  beginShape();
  fill(80, 110, 70);
  vertex(250, 80);
  bezierVertex(200, 50, 150, 120, 180, 200);
  bezierVertex(190, 240, 220, 280, 300, 280);
  bezierVertex(380, 280, 410, 240, 420, 200);
  bezierVertex(450, 120, 400, 50, 350, 80);
  endShape(CLOSE);

  // Eyes
  fill(0);
  ellipse(220, 170, 60, 90);
  ellipse(380, 170, 60, 90);

  fill(248, 248, 255); // Eyeballs
  ellipse(230, 150, 20, 17);
  ellipse(390, 150, 20, 17);

  // Nostrils
  noStroke();
  fill(66, 87, 39);
  ellipse(320, 240, 10, 10);
  ellipse(290, 240, 10, 10);

  // Mouth
  fill(255);
  stroke(0);
  strokeWeight(3);
  line(278, 268, 330, 268);


 

  // Antenna 
  push();
  translate(320, 80); // Top of the head
  rotate(frameCount % 80); // Slow rotation
  stroke(66, 87, 39);
  strokeWeight(4);
  line(0, 0, 0, -50); // Stalk
  noStroke();
  fill(255, 100, 100);
  ellipse(0, -55, 20, 20); // Tip
  pop();

 
  
  

 

  
}



