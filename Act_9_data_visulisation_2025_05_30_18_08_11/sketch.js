//all the data
let winners = [
  { artist: "Beyoncé", wins: 35 },
  { artist: "Georg Solti", wins: 31 },
  { artist: "Quincy Jones", wins: 28 },
  { artist: "Chick Corea", wins: 28 },
  { artist: "Alison Krauss", wins: 27 },
  { artist: "Stevie Wonder", wins: 25 },
  { artist: "Jay-Z", wins: 24 },
];

let margin = 80;             // margins
let chartHeight;             // Height
let maxWins;                 // Highest number of wins 
let animationProgress = 0;   // use  to animate  bar growth smoothly
let hoveredIndex = -1;       // Index of the bar currently hovered by the mouse

function setup() {
  createCanvas(1400, 500);
  maxWins = max(winners.map(w => w.wins));        // Finds the highest win count
  chartHeight = height - 150;                    // Leave space at the top and the bottom
  textAlign(CENTER, CENTER);
  frameRate(60);
  noStroke();
  textFont('Comic Sans MS');                      //font
}

function draw() {
  background('#000000');                        //  black background

  // floating animation for the heading
  fill('#ffb6d9');
  textSize(32);
  textStyle(BOLD);
  text(' Top Grammy Award Winners ', width / 2, 50 + 6 * sin(frameCount * 0.04));
  textStyle(NORMAL);

  // animates the bar at the starting of the sketch
  if (animationProgress < 1) {
    animationProgress += 0.02;
    animationProgress = min(animationProgress, 1);
  }

  let barWidth = (width - 3 * margin) / winners.length * 0.6;         // Width of each bar
  let space = (width - 2 * margin) / winners.length;           // Space allocated  for the per artist
  hoveredIndex = -1;                                            // Reset hover index

  for (let i = 0; i < winners.length; i++) {
    let w = winners[i];
    let x = margin + i * space + (space - barWidth) / 2;
    let targetHeight = map(w.wins, 0, maxWins, 0, chartHeight);
    let baseHeight = targetHeight * easeOut(animationProgress);
    let bounce = 8 * sin(frameCount * 0.1 + i); // Adds gentle bounce effect to bars
    let barTop = height - margin - baseHeight;

    // Check if mouse is hovering over  bar
    if (mouseX > x && mouseX < x + barWidth && mouseY > barTop && mouseY < height - margin) {
      hoveredIndex = i;
    }

    push();
    translate(x, height - margin); // Move origin to base of each bar

    // Highlight the bar on hovering
    if (hoveredIndex === i) {
      fill('#ffcce5');
      drawingContext.shadowColor = '#ff66b3';
      drawingContext.shadowBlur = 25;
      textSize(20);
      text('💕', barWidth / 2, -baseHeight - bounce - 45); // Cute emoji above hovered bar
    } else {
      fill('#ff66b3');
      drawingContext.shadowBlur = 0;
    }

    // Draws bar with rounded corners
    rect(0, -baseHeight - bounce, barWidth, baseHeight + bounce, 15);

    // Display number of wins above the bar
    fill('#ffe6f0');
    textSize(18);
    textStyle(BOLD);
    text(w.wins + ' 🏆', barWidth / 2, -baseHeight - bounce - 20);

    // Artist name displayed below the bar
    fill('#ffaad4');
    textSize(14);
    textStyle(NORMAL);
    text(w.artist, barWidth / 2, 25);

    pop();
  }
}

// Easing function to make all the  bars animation smoothly
function easeOut(t) {
  return t * (2 - t);
}
