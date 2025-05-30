let img;

function preload() {
  img = loadImage("animals-9533774_1280.jpg");  //loads the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);     //draws a full screen canvas
  imageMode(CENTER);                           //draws the image in the center
  noStroke();
}

function draw() {
  background(0);                              //black background
  translate(width / 2, height / 2);          //centers the image

  img.loadPixels();                         
  // Loop through every second pixel for speed
  for (let y = 0; y < img.height; y += 2) {
    for (let x = 0; x < img.width; x += 2) {
      let index = (x + y * img.width) * 4;
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      fill(255 - r, 255 - g, 255 - b);
      rect(x - img.width / 2, y - img.height / 2, 2, 2); //draws small rectangles
    }
  }
}
