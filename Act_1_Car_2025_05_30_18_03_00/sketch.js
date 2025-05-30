function setup() {
  createCanvas(700, 700);     //setting the canvas size
  background(183, 242, 255); //  setting the background Sky blue

  // Road
  fill(5);
  noStroke();
  rect(0, 300, width, 70);

  // Dashed  white lines on the road
  stroke(255);
  strokeWeight(6);
  for (let x = 0; x < width; x += 40) {
    line(x, 335, x + 20, 335); //creating alot of dash segements
  }

  // --- Car Body ---
  noStroke();
  fill(176, 5, 5); // Red main body
  rect(150, 195, 290, 80, 15); // Lower base

  // Car top (cabin)
  fill(200, 10, 10);
  rect(200, 150, 190, 60, 20);

  // Windows
  fill(135, 206, 250);              // Light blue glass
  rect(210, 160, 60, 40, 10);       // Front and
  rect(280, 160, 60, 40, 10);        //back window
  
  // Door line
  stroke(255);
  strokeWeight(1);
  line(270, 195, 270, 275);

  // Door handle
  noStroke();
  fill(255);
  rect(260, 230, 20, 5, 3);

  // wheels
  stroke(255);
  strokeWeight(2);
  fill(0);
  ellipse(200, 280, 60); // Left tire
  ellipse(400, 280, 60); // Right tire

  
  //inner part of the wheels
  fill(115);          //greyish color
  ellipse(200, 280, 23, 25);
  ellipse(400, 280, 23, 25);

  // Head and tail lights
  noStroke();
  fill(255, 11, 11); 
  ellipse(145, 215, 17, 10);

  fill(255, 243, 11); 
  ellipse(445, 215, 17, 10);

  // Antenna 
  stroke(0);
  strokeWeight(1);
  line(280, 150, 280, 130);
  fill(0);
  ellipse(280, 130, 5,);
}
