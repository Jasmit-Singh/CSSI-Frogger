// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, createButton */

let backgroundColor,
  frogX,
  frogY,
  score,
  lives,
  gameIsOver,
  car1X,
  car1Y,
  car1V,
  car2X,
  car2Y,
  car2V,
  car3X,
  car3Y,
  car3V,
  truckX,
  truckY,
  truckV,
  frogV,
  frogImage,
  carImage,
  raceCarImage,
  groundImage,
  waterImage,
  policeCarImage,
  truckImage,
  hit1,
  hit2,
  hit3,
  hit4;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 20;
  frogImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2Fddpa10m-497a26e9-778f-4e30-a532-61e80aa195d1.gif?v=1626798094185"
  );
  image(frogImage, frogX, frogY, 20, 20);
  carImage = loadImage(
    "https://cdn.glitch.com/95a66b76-fbd9-406f-8fa3-83e9e30b02f1%2Ffrogger-car1.png?v=1594751603667"
  );
  raceCarImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FRace%20Car%20Pixel.png?v=1626803080133"
  );
  policeCarImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FPixelartPoliceCar.png?v=1626804449871"
  );
  truckImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FPixelTruck.png?v=1626804968052"
  );
  skyImage = loadImage(
  "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FSky%20Background.jpg?v=1626806153575");
  hit3 = collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20);
  if (hit3) {
    lives--;
    frogX = 250;
    frogY = 475;
    car3V * 0.5;
}
  groundImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FPixel%20Ground%20Grass.png?v=1626800320343"
  );
  waterImage = loadImage(
    "https://cdn.glitch.com/3beb68a5-26b3-4a76-addb-09b4d9f9b252%2FWater%20Background.jpg?v=1626800858695"
  );
  frogX = 250;
  frogY = 475;
  frogV = 10;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 8;
  car2X = width;
  car2Y = 200;
  car2V = 10;
  car3X = width;
  car3Y = 400;
  car3V = 2;
  truckX = 0;
  truckY = 300;
  truckV = 5;
}

function draw() {
  background(backgroundColor);

  // Code for gold goal line
  //fill(60, 80, 80);
  //rect(0, 0, width, 50);
  image(skyImage, 0, 0, width, 50);

  //Road Background
  //image(roadImage, 0, 270, width, 100);
  //Water Background
  //image(waterImage, 0, 360, width, 100 );

  //Ground Starting Point
  image(groundImage, 0, 450, width / 2, 50);
  image(groundImage, width / 2, 450, width / 2, 50);

  //Frog GIF
  image(frogImage, frogX, frogY, 20, 20);

  //Functions
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (lives > 0) {
    if (keyCode === UP_ARROW) {
      frogY -= frogV;
    } else if (keyCode === DOWN_ARROW) {
      frogY += frogV;
    } else if (keyCode === LEFT_ARROW) {
      frogX -= frogV;
    } else if (keyCode === RIGHT_ARROW) {
      frogX += frogV;
    }
  }
}

function moveCars() {
  // Code for Red Car
  car1X += car1V;
  if (car1X > width) {
    // Reset if it moves off screen
    car1X = -20;
  }

  //Code for Moving Race Car
  car2X -= car2V;
  if (car2X < -20) {
    car2X = 520;
  }

  //Code for Moving Police Car
  car3X -= car3V;
  if (car3X < -20) {
    car3X = 520;
  }

  //Code for Moving Truck
  truckX += truckV;
  if (truckX > width) {
    // Reset if it moves off screen
    truckX = -20;
  }
}

function drawCars() {
  // Code for Sports Car
  image(carImage, car1X, car1Y, 40, 30);
  // Code for Race Car
  image(raceCarImage, car2X, car2Y, 40, 30);
  //Code for Police Car
  image(policeCarImage, car3X, car3Y, 40, 30);
  image(truckImage, truckX, truckY, 50, 40);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  hit1 = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  if (hit1) {
    lives--;
    frogX = 250;
    frogY = 475;
    car1V * 0.5;
  }
  //When frog hits Race Car
  hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  if (hit2) {
    lives--;
    frogX = 250;
    frogY = 475;
    car2V * 0.5;
  }
  //When frog hits Police Car
  hit3 = collideRectCircle(car3X, car3Y, 40, 30, frogX, frogY, 20);
  if (hit3) {
    lives--;
    frogX = 250;
    frogY = 475;
    car3V * 0.5;
}
  //When frog hits Police Car
  hit4 = collideRectCircle(truckX, truckY, 50, 40, frogX, frogY, 20);
  if (hit4) {
    lives--;
    frogX = 250;
    frogY = 475;
    truckV * 0.5;
}
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (collideRectCircle(0, 0, width, 50, frogX, frogY, 20)) {
    score += 100;
    frogX = 250;
    frogY = 475;
    car1V * 2;
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives:`, 10, 20);
  if (lives >= 3) {
    image(frogImage, 48, 7, 15, 15);
    image(frogImage, 70, 7, 15, 15);
    image(frogImage, 92, 7, 15, 15);
  } else if (lives >= 2) {
    image(frogImage, 48, 7, 15, 15);
    image(frogImage, 70, 7, 15, 15);
  } else if (lives >= 1) {
    image(frogImage, 48, 7, 15, 15);
  }
  // Display Score
  text(`Score: ${score}`, 10, 40);
  // Display game over message if the game is over
  if (lives == 0) {
    textSize(30);
    text(`G A M E  O V E R`, width / 2, height / 2);
  }
}
