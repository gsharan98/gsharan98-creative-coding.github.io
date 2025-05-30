let img, post;

function preload() {
  img = loadImage("animals-9533774_1280.jpg"); // loads the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);       //
  noLoop(); // Only run once for a  static poster effect

  post = createImage(img.width, img.height);
  img.loadPixels();
  post.loadPixels();
  
// Reduce color values to nearest multiple of 64
  for (let i = 0; i < img.pixels.length; i += 4) {     //red
    post.pixels[i]     = floor(img.pixels[i] / 64) * 64; //green
    post.pixels[i + 1] = floor(img.pixels[i + 1] / 64) * 64; //blue
    post.pixels[i + 2] = floor(img.pixels[i + 2] / 64) * 64;  //opaque
    post.pixels[i + 3] = 255;     //apply changes
  }

  post.updatePixels();
}

function draw() {
  background(0);
  image(post, width / 2, height / 2);     // draws the final image
}
