function setup() {
  createCanvas(600, 600);//create a canvas 
  noStroke(); //removes the borders
  noCursor(); //  hides cursor 
}

function draw() {
  background(20, 20, 30, 50); // draws a semitransparent background for trailing effect
  
  
   // Map mouse position to control  the spacing between the  circles
  let spacing = map(mouseX, 0, width, 20, 100);
  
  // Loop through  x and y positions
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let size = map(mouseY, 0, height, 5, spacing);
      let r = random(100, 255);
      let g = random(50, 200);
      let b = random(150, 255);
      
//generates random colors with semi transparency effect
      fill(r, g, b, 150);
      ellipse(x + random(-5, 5), y + random(-5, 5), size, size);
      // Draw circles with slight offset to make it in motion
    }
  }
}
