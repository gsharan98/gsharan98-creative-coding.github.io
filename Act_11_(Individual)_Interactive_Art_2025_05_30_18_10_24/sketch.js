let blinkAmount = 0;
let targetBlink = 0;

// keeping the  track of the mouse trail points here:
let trail = [];
const maxTrailLength = 20;

// floation hearts
let hearts = [];

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.baseSize = random(10, 20);
    this.size = this.baseSize;
    this.alpha = 255;          
    this.speedY = random(1, 2);     // How fast the heart  floats up
    this.pulseAngle = random(TWO_PI); 
  }

  update() {
    this.y -= this.speedY;   // Moves the hearts up slowly
    this.alpha -= 5;         //  hearts Slowly fade out
    this.pulseAngle += 0.1;
    // Make the hearts gently pulse
    this.size = this.baseSize * (1 + 0.1 * sin(this.pulseAngle));
  }

  draw() {
    noStroke();
    fill(255, 100, 180, this.alpha); // Pinkish with fading opaque
    push();
    translate(this.x, this.y);
    scale(this.size / this.baseSize);
    // Draws  simple heart shape with curves
    beginShape();
    vertex(0, 0);
    bezierVertex(-this.baseSize / 2, -this.baseSize / 2,
      -this.baseSize, this.baseSize / 3,
      0, this.baseSize);
    bezierVertex(this.baseSize, this.baseSize / 3,
      this.baseSize / 2, -this.baseSize / 2,
      0, 0);
    endShape(CLOSE);
    pop();
  }

  // Once it's fully faded,it removes the hearts
  isDead() {
    return this.alpha <= 0;
  }
}

// For making the kitty's parts gently jitter using smooth noise
let jitterOffset = 0;

function setup() {
  createCanvas(600, 600);
  rectMode(CORNER);
  noiseDetail(2, 0.5);  // Adjust noise for smooth but interesting jitter
}

function draw() {
  background(255, 237, 247);  // Light pink as the  background


  
  
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    hearts.push(new Heart(mouseX, mouseY));
  }

  // Updates and draws all hearts, removing ones that have been faded
  for (let i = hearts.length - 1; i >= 0; i--) {
    hearts[i].update();
    hearts[i].draw();
    if (hearts[i].isDead()) {
      hearts.splice(i, 1); // Remove hearts that are no longer visible
    }
  }

  jitterOffset += 0.01;  // Slowly move through noise space for jitter effect

  //  add current mouse position, then draw the trail 
  addTrailPoint(mouseX, mouseY);
  drawTrail();

  fill(0);  // Black color for kitty details

  // --- Draw the left side of the kitty 
  drawJitteredRect(300, 100, 60, 6);
  drawJitteredRect(290, 105, 9, 6);
  drawJitteredRect(260, 100, 30, 6);
  drawJitteredRect(246, 93, 12, 6);

  drawJitteredRect(240, 100, 7, 6);
  drawJitteredRect(232, 105, 6, 40);
  drawJitteredRect(240, 144, 7, 15);
  drawJitteredRect(232, 160, 7, 50);
  drawJitteredRect(220, 175, 40, 6);
  drawJitteredRect(212, 169, 9, 6);
  drawJitteredRect(210, 190, 45, 6);
  drawJitteredRect(238, 210, 20, 7);
  drawJitteredRect(250, 210, 7, 20);
  drawJitteredRect(255, 230, 8, 6);
  drawJitteredRect(263, 235, 8, 6);
  drawJitteredRect(272, 239, 8, 6);
  drawJitteredRect(279, 242, 15, 6);
  drawJitteredRect(287, 248, 6, 6);
  drawJitteredRect(290, 252, 100, 6);

  // --- Right side outline of the kitty
  drawJitteredRect(360, 105, 9, 6);
  drawJitteredRect(368, 110, 6, 28);
  drawJitteredRect(373, 105, 6, 6);
  drawJitteredRect(379, 100, 6, 6);
  drawJitteredRect(384, 95, 15, 6);
  drawJitteredRect(398, 100, 6, 6);
  drawJitteredRect(404, 105, 6, 15);
  drawJitteredRect(395, 120, 25, 6);
  drawJitteredRect(390, 125, 6, 10);
  drawJitteredRect(390, 135, 10, 6);
  drawJitteredRect(398, 135, 6, 9);
  drawJitteredRect(404, 110, 6, 28);
  drawJitteredRect(370, 142, 33, 6);
  drawJitteredRect(400, 145, 9, 6);
  drawJitteredRect(408, 150, 15, 6);
  drawJitteredRect(424, 123, 6, 27);
  drawJitteredRect(410, 100, 15, 6);
  drawJitteredRect(426, 93, 15, 6);
  drawJitteredRect(440, 100, 6, 25);
  drawJitteredRect(430, 125, 11, 11);
  drawJitteredRect(440, 135, 6, 15);
  drawJitteredRect(423, 150, 18, 6);
  drawJitteredRect(420, 154, 8, 12);
  drawJitteredRect(427, 166, 16, 6);
  drawJitteredRect(443, 160, 12, 6);
  drawJitteredRect(455, 153, 6, 12);
  drawJitteredRect(460, 140, 6, 13);
  drawJitteredRect(440, 125, 13, 6);
  drawJitteredRect(455, 130, 6, 6);
  drawJitteredRect(440, 175, 6, 36);
  drawJitteredRect(425, 212, 16, 6);
  drawJitteredRect(425, 212, 6, 16);
  drawJitteredRect(418, 229, 8, 6);
  drawJitteredRect(410, 235, 8, 6);
  drawJitteredRect(402, 240, 8, 6);
  drawJitteredRect(386, 245, 18, 6);

  // --- Eyes — blink when mouse gets close,a side to side effect
  let leftEye = { x: 285, y: 180, w: 18, h: 27 };
  let rightEye = { x: 385, y: 180, w: 18, h: 27 };

  // If mouse is near the kitty's face, eyes will blink
  if (dist(mouseX, mouseY, 335, 190) < 80) {
    targetBlink = 1; // Close eyes
  } else {
    targetBlink = 0; // Keep eyes open
  }

  // Smoothly move between open and closed eye states
  blinkAmount = lerp(blinkAmount, targetBlink, 0.1);
  let eyelidHeight = 27 * blinkAmount;

  // Add subtle side-to-side eye movement only while blinking
  let eyeXoffset = sin(frameCount * 0.15) * 2 * blinkAmount;

  fill(0);
  rect(leftEye.x + eyeXoffset, leftEye.y, leftEye.w, leftEye.h);
  rect(rightEye.x + eyeXoffset, rightEye.y, rightEye.w, rightEye.h);

  fill(220); 
  rect(leftEye.x + eyeXoffset, leftEye.y, leftEye.w, eyelidHeight);
  rect(rightEye.x + eyeXoffset, rightEye.y, rightEye.w, eyelidHeight);

  // Draw highlights on the eyes when they’re closing
  if (blinkAmount > 0.01) {
    noStroke();
    fill(255, 176, 228);
    rect(390 + eyeXoffset, 208, 18, 7);
    rect(270 + eyeXoffset, 208, 18, 7);
  }

  // --- Nose
  fill(242, 195, 5);
  drawJitteredRect(335, 217, 15, 10);
  fill(0);
  drawJitteredRect(335, 210, 15, 6);
  drawJitteredRect(335, 225, 15, 6);
  drawJitteredRect(329, 215, 6, 13);
  drawJitteredRect(350, 214, 6, 13);

  // --- Whiskers
  fill(0);
  drawJitteredRect(420, 180, 35, 6);
  drawJitteredRect(455, 175, 10, 6);
  drawJitteredRect(425, 195, 35, 6);
  drawJitteredRect(458, 200, 10, 6);
  drawJitteredRect(468, 205, 10, 6);
}

// a rectangle but with a bit of smooth noise jitter 

function drawJitteredRect(x, y, w, h) {
  // Get a noise value between -1.5 and 1.5 for both x and y offsets
  let jitterX = map(noise(x * 0.05, y * 0.05, jitterOffset), 0, 1, -1.5, 1.5);
  let jitterY = map(noise(y * 0.05, x * 0.05, jitterOffset + 100), 0, 1, -1.5, 1.5);
  rect(x + jitterX, y + jitterY, w, h);
}

// Remember the mouse position for the trail effect

function addTrailPoint(x, y) {
  trail.push({ x: x, y: y, age: 0 });
  if (trail.length > maxTrailLength) {
    trail.shift();        // Remove the previous points
  }
}

// Draw the mouse trail with smooth fading
function drawTrail() {
  noStroke();

  for (let i = 0; i < trail.length; i++) {
    let p = trail[i];
    p.age += 1;

    // Make the trail fade out smoothly
    let alpha = easeOutQuad(map(i, 0, trail.length - 1, 0, 180));

    // Make previous points smaller
    let size = map(i, 0, trail.length - 1, 8, 2);

    // Swings the ellipses back and forth
    let angle = sin(p.age * 0.15 + i) * PI / 6;

    push();
    translate(p.x, p.y);
    rotate(angle);
    fill(255, 100, 180, alpha); 
    ellipse(0, 0, size * 2, size);
    pop();
  }
}

// Simple easing to make it looks smooth
function easeOutQuad(t) {
  return t * (2 - t);
}
