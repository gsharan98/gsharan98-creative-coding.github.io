// Store all the  sound files 
let sounds = {};

// Tools for analyzing sound
let fft;                  //frequency
let amp;                  //amplitude

// Background color 
let bgColor;

//displays a large flashing key letter
let flashText = '';
let flashAlpha = 0;

// Arrays that manages different  elements
let rings = [];            //  pulse rings
let spirits = [];          // particles orbiting center
let galaxyParticles = [];  //  particle effect

function preload() {
  // Loads all the sound effect files
  sounds['A'] = loadSound('electrical-hit-94810.mp3');
  sounds['S'] = loadSound('noiseysnare-104566.mp3');
  sounds['D'] = loadSound('guitar-apoggiatura7-97168.mp3');
  sounds['F'] = loadSound('drum-dj-foisal-fk-181555.mp3');
  sounds['G'] = loadSound('snare-drum-341273.mp3');
  sounds['H'] = loadSound('drop-sound-effect-240899.mp3');
  sounds['J'] = loadSound('guitar-skank-g-min-102726.mp3');
  sounds['K'] = loadSound('moon.mp3');
  sounds['L'] = loadSound('pinwheel.mp3');
  sounds['Z'] = loadSound('piston-1.mp3');
  sounds['X'] = loadSound('piston-2.mp3');
  sounds['C'] = loadSound('prism-1.mp3');
  sounds['V'] = loadSound('prism-2.mp3');
  sounds['B'] = loadSound('squiggle.mp3');
  sounds['N'] = loadSound('sharp-pop-328170.mp3');
  sounds['M'] = loadSound('timer.mp3');
  sounds['Q'] = loadSound('ufo.mp3');
  sounds['W'] = loadSound('veil.mp3');
  sounds['E'] = loadSound('whoosh-drum-hits-169007.mp3');
  sounds['R'] = loadSound('zig-zag.mp3');
  sounds['T'] = loadSound('joke-drums-2-259684.mp3');
  sounds['Y'] = loadSound('kick-drum-263837.mp3');
  sounds['U'] = loadSound('fx-percussion-huge-cinematic-tom-hit-283585.mp3');
  sounds['I'] = loadSound('snare-drum-341273.mp3');
  sounds['O'] = loadSound('pressing-a-light-toggle-switch-104490.mp3');  
  sounds['P'] = loadSound('soda-bottle-base-drum-46019.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255, 255); // Full color + alpha
  bgColor = color(0);               //  background
  fft = new p5.FFT();               //   sets up frequency analysis
  amp = new p5.Amplitude();         // Sets up amplitude analyzer
  background(0);                    //initial background color
  noStroke();
  textAlign(CENTER, CENTER);        //  text aligned in the center
}

function draw() {
  background(bgColor);            // Uses intial black background color
  // Slightly changes the background color slowly
  bgColor = lerpColor(bgColor, color(random(30), random(30), random(30), 50), 0.05);

  let waveform = fft.waveform(); // Gets the waveform data
  let level = amp.getLevel();    // Gets the volume level

  // Trigger visuals
  drawRadialSpikes(level);
  drawWaveformMirror(waveform);
  updatePulseRings(level);
  updateSpirits(level);
  updateGalaxy(level);
  drawKeyFlash();
}

  

// Draws spikes  that radiates from the center differ depending on the  sound level
function drawRadialSpikes(level) {
  let spikes = 60;
  let radius = map(level, 0, 1, 100, 300); // Adjust radius depending on the volume
  push();
  translate(width / 2, height / 2);
  stroke(255, 150);
  strokeWeight(2);
  for (let i = 0; i < spikes; i++) {
    let angle = TWO_PI / spikes * i;
    let len = radius + random(-20, 20);    // Add wobbling effect to each line
    line(0, 0, len * cos(angle), len * sin(angle));
  }
  pop();
}

// Mirror waveform throughout the  center line to create symmetrical shapes
function drawWaveformMirror(waveform) {
  push();
  translate(width / 2, height / 2);
  noFill();
  stroke(255, 100);
  strokeWeight(2);

  // Top half of the  waveform
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, -width / 2, width / 2);
    let y = map(waveform[i], -1, 1, -100, 100);
    vertex(x, y);
  }
  endShape();

  // Bottom half
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, -width / 2, width / 2);
    let y = map(waveform[i], -1, 1, 100, -100);
    vertex(x, y);
  }
  endShape();

  pop();
}

// Expanding the  rings based on  the  pulses
function updatePulseRings(level) {
  // Add new ring when level is high enough
  if (level > 0.1) {
    rings.push({ r: 0, alpha: 255 });
  }

  // Update the already existing rings
  for (let i = rings.length - 1; i >= 0; i--) {
    rings[i].r += 5;       // Expand
    rings[i].alpha -= 5;   // Fade out
    if (rings[i].alpha <= 0) rings.splice(i, 1); 
  }

  // Draws each ring
  noFill();
  stroke(255);
  strokeWeight(2);
  rings.forEach(ring => {
    stroke(255, ring.alpha);
    ellipse(width / 2, height / 2, ring.r * 2);
  });
}

// Floating "spirit" dots  in the background that orbit and fade away
function updateSpirits(level) {
  // Occasionally create a new spirit
  if (random() < 0.05) {
    spirits.push({
      angle: random(TWO_PI),
      dist: random(100, 200),
      speed: random(0.01, 0.03),
      size: random(5, 15),
      alpha: 255
    });
  }

  // Move and fade spirit dots
  for (let i = spirits.length - 1; i >= 0; i--) {
    spirits[i].angle += spirits[i].speed;
    spirits[i].alpha -= 2;
    if (spirits[i].alpha <= 0) spirits.splice(i, 1); // Remove  the already faded ones spirit dots
  }

  // Draw spirit dots
  push();
  translate(width / 2, height / 2);
  noStroke();
  spirits.forEach(spirit => {
    fill(255, 150, 255, spirit.alpha);
    let x = spirit.dist * cos(spirit.angle);
    let y = spirit.dist * sin(spirit.angle);
    ellipse(x, y, spirit.size);
  });
  pop();
}

// Galaxy alike particles floating in the background
function updateGalaxy(level) {
  // Add new particles occasionally
  if (random() < 0.1) {
    galaxyParticles.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      alpha: 200,
      vel: createVector(random(-1, 1), random(-1, 1))
    });
  }

  // Update movement  of those particles and its fades slowly
  for (let i = galaxyParticles.length - 1; i >= 0; i--) {
    let p = galaxyParticles[i];
    p.x += p.vel.x * (1 + level * 5);
    p.y += p.vel.y * (1 + level * 5);
    p.alpha -= 2;
    if (p.alpha <= 0) galaxyParticles.splice(i, 1); // Remove faded particles
  }

  // Draw particles
  noStroke();
  galaxyParticles.forEach(p => {
    fill(255, 255, 200, p.alpha);
    ellipse(p.x, p.y, p.size);
  });
}

// Draw large letter to show which key is pressed
function drawKeyFlash() {
  if (flashAlpha > 0) {
    fill(255, flashAlpha);
    textSize(150);
    text(flashText, width / 2, height / 2);
    flashAlpha -= 5; // Gradually fade out
  }
}

// ---------------- INPUT  ----------------

// Respond to key  being pressed
function keyPressed() {
  let keyUpper = key.toUpperCase();
  if (sounds[keyUpper]) {
    // Stop any ongoing sound to allow quick re-triggering
    if (sounds[keyUpper].isPlaying()) {
      sounds[keyUpper].stop();
    }
    sounds[keyUpper].play();

    
    fft.setInput(sounds[keyUpper]);
    amp.setInput(sounds[keyUpper]);

    //  the letter flash effect
    flashText = keyUpper;
    flashAlpha = 255;
  }
}
