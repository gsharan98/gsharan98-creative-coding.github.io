let textStr = "Welcome to Bath Spa University"; // the text we want to show
let baseFontSize = 60; // size of the text
let letters = []; // to store each letter with its width
let glitching = true; // to toggle glitch effect
let glowColor; // neon color for glowing text
let particles = []; // background moving dots
let clickSound; // Sound for clicks and key presses

function preload() {
  clickSound = loadSound('sharp-pop-328170.mp3'); // Load your sound file here
}

function setup() {
  createCanvas(windowWidth, windowHeight); // full screen canvas
  textAlign(CENTER, CENTER); // center the text
  textFont('Courier New'); // font style
  glowColor = color(0, 255, 255); // default neon cyan color
  initLetters(); // get each letter's width
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle()); // make 100 small background dots
  }
}

function draw() {
  background(14, 14, 30); // dark background
  drawParticles(); // show moving background dots
  drawInstructions(); // draw the glowing instruction box

  // calculate full width of the text
  let totalWidth = 0;
  letters.forEach(l => totalWidth += textWidth(l.char));

  // center the text on the screen
  let startX = width / 2 - totalWidth / 2;
  let x = startX;
  textSize(baseFontSize); // set font size
  noStroke();

  // loop through each letter and display with effects
  for (let i = 0; i < letters.length; i++) {
    let l = letters[i];

    // calculate distance from mouse to letter
    let distToMouse = dist(mouseX, mouseY, x + l.w / 2, height / 2);

    // glow is stronger when mouse is closer
    let glowStrength = map(distToMouse, 0, 200, 1, 0, true);

    push();
    translate(x + l.w / 2, height / 2); // move to letter position

    if (glitching && random(1) < 0.1) {
      // glitch effect: small random move
      let glitchX = random(-5, 5);
      let glitchY = random(-5, 5);
      fill(glowColor.levels[0], glowColor.levels[1], glowColor.levels[2], 200);
      textSize(baseFontSize + random(-4, 4)); // random size
      text(l.char, glitchX, glitchY); // draw with offset
    }

    // glowing main text
    drawingContext.shadowColor = glowColor;
    drawingContext.shadowBlur = 20 * glowStrength;
    fill(lerpColor(color(50), glowColor, glowStrength)); // mix dark and glow
    textSize(baseFontSize);
    text(l.char, 0, 0); // draw normal

    pop();
    x += l.w; // move to next letter position
  }
}

function mouseClicked() {
  glitching = !glitching; // turn glitch on/off when mouse is clicked
  if (clickSound && clickSound.isLoaded()) {
    clickSound.play(); // play sound
  }
}

function keyPressed() {
  // change glow color with keys
  if (key === 'R' || key === 'r') glowColor = color(255, 0, 0); // red
  else if (key === 'G' || key === 'g') glowColor = color(0, 255, 0); // green
  else if (key === 'Y' || key === 'y') glowColor = color(255, 255, 0); // yellow
  else if (key === 'C' || key === 'c') glowColor = color(0, 255, 255); // cyan
  else if (key === 'O' || key === 'o') glowColor = color(255, 128, 0); // orange
  else if (key === 'P' || key === 'p') glowColor = color(255, 143, 224); // pink
  else if (key === 'B' || key === 'b') glowColor = color(0, 128, 255); // blue
  else if (key === 'W' || key === 'w') glowColor = color(255, 255, 255); // white
  else if (key === 'I' || key === 'i') glowColor = color(204, 153, 255); // indigo/purple

  if (clickSound && clickSound.isLoaded()) {
    clickSound.play(); // play sound on key press
  }
}

// class to create each background dot
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height)); // random position
    this.vel = p5.Vector.random2D().mult(random(0.2, 0.8)); // random speed and direction
    this.size = random(3, 10); // small size
  }

  update() {
    this.pos.add(this.vel); // move dot

    // wrap around edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    noStroke();
    fill(255, 255, 255, 200); // light blue color
    ellipse(this.pos.x, this.pos.y, this.size); // draw dot
  }
}

// draw all dots
function drawParticles() {
  particles.forEach(p => {
    p.update();
    p.display();
  });
}

// store each letter and its width
function initLetters() {
  letters = [];
  textSize(baseFontSize);
  for (let i = 0; i < textStr.length; i++) {
    let c = textStr.charAt(i);
    letters.push({ char: c, w: textWidth(c) }); // save char and width
  }
}

// resize canvas when window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initLetters(); // re-calculate letter positions
}

// draw the top-left glowing instruction box
function drawInstructions() {
  push(); // save current style settings

  textAlign(LEFT, TOP); // align text to top-left corner
  textSize(14); // text size for instructions

  // shortcut keys and message text
  let instructions = "✨ Press:\n" +
                     "R - Red\n" +
                     "O - Orange\n" +
                     "Y - Yellow\n" +
                     "G - Green\n" +
                     "B - Blue\n" +
                     "P - Pink\n" +
                     "I - Indigo\n" +
                     "W - White\n\n" +
                     "🖱 Click to toggle glitch!";

  // box size
  let boxW = 180;
  let boxH = 180;

  fill(20, 20, 40, 200); // semi-transparent dark bg
  stroke(glowColor); // border color same as glow
  strokeWeight(1); // thin border
  rect(20, 20, boxW, boxH, 12); // draw rounded box

  // apply glow effect for the text
  drawingContext.shadowColor = glowColor;
  drawingContext.shadowBlur = 10;

  noStroke(); // no border for text
  fill(255); // white text
  text(instructions, 30, 30); // draw the instruction lines

  pop(); // restore original style
}