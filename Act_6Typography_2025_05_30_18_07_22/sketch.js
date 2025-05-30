let balloons = [];
let quotes = [
  "Shine on",
  "Dream,Wish and Do it.",
  "Smile",
  "You got this",
  "Stay cool",
  "Dream big",
  "dont give up",
  "Keep going",
  "Be happy",
  "you deserve this "
];
let poppedQuotes = [];

// Cute pastel colors 
const pastelColors = [
  [340, 80, 85],      //  pastel 
  [200, 70, 85],      //  blue
  [150, 60, 80],      //  green
  [50, 90, 85],       //  yellow
  [270, 60, 80]       //  lavender
];

function setup() {
  createCanvas(1000, 1000);
  textAlign(CENTER, CENTER);       //center alignment
  colorMode(HSL, 360, 100, 100);   //using HSL colors
  noStroke();                      //removing strokes
  textFont('Poppins');             // changing text font to poppins
  for (let i = 0; i < 20; i++) {      //creating 20 ballons in array
    balloons.push(new Balloon());
  }
}


//black background
function draw() {
  background(0); 

  //updates the ballons
  for (let b of balloons) {
    b.move();
    b.display();
  }
  //updates the quotes
  for (let q of poppedQuotes) {
    q.update();
    q.display();
  }
}



//this function is called when mouse is pressed
function mousePressed() {
  for (let b of balloons) {
    
    //checking is the ballon is pressed/popped or not
    if (!b.popped && dist(mouseX, mouseY, b.x, b.y) < b.size / 2) {
      b.popped = true;  //if its popped
      let q = random(quotes);  //gives a random quote
      poppedQuotes.push(new PoppedQuote(b.x, b.y, q));
    }
  }
}


//class of floating ballons
class Balloon {
  constructor() {
    this.x = random(50, width - 50);    //any random x position
    this.y = random(height, height + 500);//random starts below the canvas
    this.size = random(80, 120);    //random size
    this.speed = random(0.5, 1.5);   //upward speed
    this.popped = false;            //not popped in the starting
    let c = random(pastelColors);
    //assigning random pastel colors
    this.colorHue = c[0];
    this.colorSat = c[1];
    this.colorLight = c[2];
  }

  move() {
    if (!this.popped) {
      this.y -= this.speed; //upward position
       // Reset position if  the balloon leaves the  canva
      if (this.y < -this.size) {
        this.y = height + random(100, 500);
        this.x = random(50, width - 50);
      }
    }
  }

  display() {
    if (!this.popped) {
      push();
      translate(this.x, this.y);
      //glowing effects
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = color(this.colorHue, this.colorSat, this.colorLight);
      fill(this.colorHue, this.colorSat, this.colorLight, 0.9); // pastel tint with alpha
      ellipse(0, 0, this.size * 0.8, this.size);//baloon shape

      
      
      //baloon string
      noFill();
      stroke(255, 150);
      strokeWeight(2);
      line(0, this.size * 0.4, 0, this.size * 0.9);
      noStroke();
      pop();
    
    }
  }
}
//  this Class representing a floating popped quote
class PoppedQuote {
  constructor(x, y, textContent) {
    this.x = x;
    this.y = y;
    this.text = textContent;
    this.opacity = 0;
    this.scale = 0.2;
    this.targetScale = 1.3;
    this.bounceSpeed = 0.05;
    this.lift = 0;   //vertical movemnet upwards
  }

  update() {
    if (this.opacity < 255) {
      this.opacity += 10;    //fades in
    }

    if (this.scale < this.targetScale) {
      this.scale += this.bounceSpeed;
    } else {
      this.scale = this.targetScale;  //bounce up
    }

    this.lift += 0.2; // move quote upwards
  }

  display() {
    push();
    translate(this.x, this.y - this.lift);

    textSize(36 * this.scale);
    textStyle(BOLD);

    // Pure white with glow
    drawingContext.shadowBlur = 60;
    drawingContext.shadowColor = color(0, 0, 100);
    fill(0, 0, 100); // pure white
    text(this.text, 0, 0);

    drawingContext.shadowBlur = 0;
    pop();
  }
}
