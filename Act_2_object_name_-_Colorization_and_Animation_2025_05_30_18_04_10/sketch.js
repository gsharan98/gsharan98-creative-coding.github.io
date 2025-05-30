// This array represents a heart shape using 1s and 0s
// 1 means "draw a pixel", 0 means "leave blank"
let heartPixels = [
  [0, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0]
];

// Size of each square "pixel"
let pixelSize = 40;

// This keeps track of how many heart pixels to draw so far
let pixelsToShow = 0;

function setup() {
  createCanvas(400, 400);  
  frameRate(5); // Draw 5 fps
  noStroke();   
}

function draw() {
  background(135, 206, 235); 

  //To calculate starting position so the heart is centered on the canvas
  let startX = width / 2 - (heartPixels[0].length * pixelSize) / 2;
  let startY = height / 2 - (heartPixels.length * pixelSize) / 2;

  let drawnCount = 0;  // To count how many pixels have been drawn

  // To Loop through each row in heartPixels
  for (let row = 0; row < heartPixels.length; row++) {
    // To Loop through each column in the current row
    for (let col = 0; col < heartPixels[row].length; col++) {
      // If the value is 1, draw a pixel
      if (heartPixels[row][col] === 1) {
        // Only draw pixels if we haven't reached pixelsToShow count yet
        if (drawnCount < pixelsToShow) {
          fill(255, 0, 100); // Heart pink color
          rect(
            startX + col * pixelSize, // X position
            startY + row * pixelSize, // Y position
            pixelSize,                // Width of the pixel
            pixelSize                 // Height of the pixel
          );
        }
        drawnCount++; // Increases how many pixels we have drawn/considered
      }
    }
  }

  pixelsToShow++; // Increases number of pixels to show in next frame

  // Calculate total number of pixels to draw (number of 1's in heartPixels)
  let totalHeartPixels = heartPixels.flat().filter(p => p === 1).length;

  // To Stop the animation once all pixels are shown
  if (pixelsToShow > totalHeartPixels) {
    noLoop(); 
  }
}