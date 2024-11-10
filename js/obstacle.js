// js/obstacle.js

class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.left = Math.floor(Math.random() * 300 + 70); // Random horizontal position
      this.top = 0; // Initial vertical position at the top of the screen
      this.width = 100;
      this.height = 150;
  
      // Create the image element representing the obstacle
      this.element = document.createElement("img");
      this.element.src = "./images/redCar.png";
      this.element.style.position = "absolute";
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
  
      // Append the element to the game screen
      this.gameScreen.appendChild(this.element);
    }
  
    updatePosition() {
      // Update the obstacle's position based on its current left and top values
      this.element.style.left = `${this.left}px`;
      this.element.style.top = `${this.top}px`;
    }
  
    move() {
      // Move the obstacle down by 3 pixels
      this.top += 3;
      // Update the obstacle's position on the screen
      this.updatePosition();
    }
  }
  