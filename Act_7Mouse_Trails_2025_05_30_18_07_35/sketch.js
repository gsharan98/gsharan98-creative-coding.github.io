let particles = [];             // array storing  all the  glowing  particles
const maxParticles = 40;        // Keep the  particles under control for better speed
let prevMouse;                  // previous mouse position

let balls = [];                 //  all the collectible balls
let score = 0;                  //  current score
const totalBalls = 10;          // Total amount of  balls  that will  appear on  the screen

let timer = 60;                 // setting custom timer for the timing of the game
let gameOver = false;           // tracks if the game is ended
let lastSecond;                 // controls the countdown

//  The Sound effect variables
let collectSound, gameOverSound;


function preload() {
  collectSound = loadSound('collect-points-190037.mp3');             // Sound plays when  you collect a ball
  gameOverSound = loadSound('game-over-39-199830.mp3');              // Sound  plays when the time runs out
}


function setup() {
  createCanvas(1800, 600);                        // Creating a canvas
  colorMode(HSL, 360, 100, 100, 1);              // Use HSL color mode
  noFill(); 
  background(10);                                // Starts with a dark background
  prevMouse = createVector(mouseX, mouseY);      //  initial mouse position


  //  set of  all the collectible balls
  for (let i = 0; i < totalBalls; i++) {
    balls.push(new Ball());
  }

  lastSecond = millis();                // Starts the timer
}

// this function runs and draws the sketch
function draw() {
  background(10, 10, 10, 0.15);             //background 

  // Countdown timer 
  if (!gameOver) {
    if (millis() - lastSecond >= 1000) { 
      timer--; 
      lastSecond = millis(); 
      if (timer <= 0) {
        gameOver = true;
        gameOverSound.play(); // Play the  ending  sound
      }
    }
  }

  // Calculates the  mouse speed
  let mousePos = createVector(mouseX, mouseY);
  let mouseVel = p5.Vector.sub(mousePos, prevMouse); 
  let speed = mouseVel.mag(); 

  // Only adds the  particles if the mouse is still moving and if the game isnt over yet
  if (!gameOver && speed > 0.5) {
    particles.push(new Particle(mousePos.x, mousePos.y, speed));
  }

  // Remove  the old particles  to give it a clean look
  if (particles.length > maxParticles) particles.shift();

  // Update all  the particles
  for (let p of particles) {
    p.update(mousePos);
  }

  // Draws a flowing ribbon trail by connecting all those particles 
  strokeWeight(1);
  stroke(0, 0, 100, 0.3); 
  noFill();
  for (let i = 1; i < particles.length; i++) {
    let p0 = particles[i - 1];
    let p1 = particles[i];
    let midX = (p0.pos.x + p1.pos.x) / 2;
    let midY = (p0.pos.y + p1.pos.y) / 2;

    beginShape();
    vertex(p0.pos.x, p0.pos.y);
    quadraticVertex(midX, midY, p1.pos.x, p1.pos.y); // Smooth curve between particles
    endShape();
  }

  // Drawing  each  of the particle with  a soft glow and color
  for (let p of particles) {
    p.display(speed);
  }

  //  checks any kind of collisions with each ball
  for (let ball of balls) {
    ball.display();

    //if the mouse collects the ball 
    if (!gameOver && dist(mouseX, mouseY, ball.pos.x, ball.pos.y) < ball.radius + 10) {
      score++;                                  // auomatically  Increases the  score
      ball.respawn();                          //  and Moves the  ball to a new location
      burst(ball.pos.x, ball.pos.y);          // A burst effect
      collectSound.play();                   // collect Sound effect
    }
  }

  // Shows the total  score and time on  the screen
  noStroke();
  fill(0, 0, 100);
  textSize(20);
  textAlign(LEFT, TOP);
  text(`Score: ${score}`, 10, 10);
  text(`Time: ${timer}s`, 10, 40);

  //if the game is over display game over message 
  if (gameOver) {
    textAlign(CENTER, CENTER);          //aligning it to the center
    textSize(36);
    fill(0, 0, 100);
    text("Game Over!", width / 2, height / 2 - 20);
    textSize(24);
    text(`Final Score: ${score}`, width / 2, height / 2 + 20);
  }

  prevMouse.set(mousePos);             // Update the previous mouse position for the next frame
}

// Particle class 
class Particle {
  constructor(x, y, speed) {
    this.pos = createVector(x, y);                             // Where the particle is
    this.vel = p5.Vector.random2D().mult(speed * 0.3);         // Random initial direction
    this.acc = createVector(0, 0); 
    this.baseSize = random(4, 9) * (0.7 + speed * 0.1);       // Base size based on speed
    this.size = this.baseSize;
    this.age = 0;                                             // Track how long the particle exists
    this.noiseOffset = random(1000);                          // For smooth animation
  }

  update(target) {
    this.age++; // Get older
    let force = p5.Vector.sub(target, this.pos);             // Calculate attraction to mouse
    force.setMag(0.1);                                      //  a gentle pull
    this.acc.add(force);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); 
    this.vel.mult(0.85);

    // Make the particles size wiggle nicely 
    this.size = this.baseSize * (1 + 0.3 * sin(this.age * 0.3 + this.noiseOffset));
    this.size = constrain(this.size, this.baseSize * 0.7, this.baseSize * 2);
  }

  display(speed) {
    push();
    translate(this.pos.x, this.pos.y);

    // Add a glowing effect with the help of canvas shadow
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = `hsla(${(frameCount * 3) % 360}, 90%, 70%, ${0.6 + speed * 0.04})`;

    // Set the  color based on  the speed
    let hue = map(speed, 0, 20, 220, 280);
    stroke(hue, 80, 70, 0.9 + speed * 0.02);
    strokeWeight(1.5 + speed * 0.1);
    fill(hue, 80, 70, 0.6 + speed * 0.04);
    ellipse(0, 0, this.size);

    // Turn off the glow
    drawingContext.shadowBlur = 0;
    pop();
  }
}

// Ball class for collectable balls
class Ball {
  constructor() {
    this.respawn(); // Place balls  randomly when  its created
  }

  respawn() {
    this.pos = createVector(random(50, width - 50), random(50, height - 50));
    this.radius = random(10, 20);                    // Random size of the ball
    this.hue = random(0, 360);                       // Random color of the ball
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    // Add a glowing effet to the balls
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = `hsla(${this.hue}, 100%, 70%, 0.8)`;

    fill(this.hue, 100, 70, 0.8);
    stroke(this.hue, 100, 80, 1);
    strokeWeight(1.5);
    ellipse(0, 0, this.radius * 2);

    drawingContext.shadowBlur = 0;
    pop();
  }
}

// Makes a small explosion  animation on particles when you collects a ball
function burst(x, y) {
  for (let i = 0; i < 8; i++) {
    let p = new Particle(x, y, random(5, 10));
    p.vel = p5.Vector.random2D().mult(random(2, 5)); // Shoot out in any random directions
    particles.push(p); 
  }
}
