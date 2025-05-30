let img;

function preload() {
  img = loadImage("animals-9533774_1280.jpg");   //load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);   //centers the image
  noStroke();
  background(0);      //keeps the background black
}

function draw() {
  translate(width / 2, height / 2);
  let stepSize = 6;     //size of each dot

  for (let i = 0; i < 2000; i++) {
    let x = floor(random(img.width));
    let y = floor(random(img.height));
    let c = img.get(x, y);    //get color from the image
    fill(c);
    ellipse(x - img.width / 2, y - img.height / 2, stepSize, stepSize);
  }//draw dot
}
