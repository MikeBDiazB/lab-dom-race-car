class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.player = new Player(this.gameScreen, 200, 500,100, "./images/car.png"); // Initialize player with a starting position
      this.height = 600;
      this.width = 500;
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameIntervalId = null;
      this.gameLoopFrequency = Math.round(1000 / 60);
    }
  
    // Method to start the game
    start() {
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";
  
      // Start the game loop
      this.gameIntervalId = setInterval(() => {
        this.gameLoop();
      }, this.gameLoopFrequency);
    }
  
    // Main game loop
    gameLoop() {
      this.update();
  
      // Stop the game loop if the game is over
      if (this.gameIsOver) {
        clearInterval(this.gameIntervalId);
      }
    }
  
    // Update method to manage game state changes
    update() {
      // Move the player's car
      this.player.move();
  
      // Randomly generate a new obstacle
      if (Math.random() > 0.98 && this.obstacles.length < 1) {
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
  
      // Loop through obstacles
      for (let i = 0; i < this.obstacles.length; i++) {
        const obstacle = this.obstacles[i];
        obstacle.move();
  
        // Collision check with player's car
        if (this.player.didCollide(obstacle)) {
          obstacle.element.remove();  // Remove the obstacle from the DOM
          this.obstacles.splice(i, 1); // Remove from array
          this.lives--; // Reduce player's lives by 1
          i--; // Adjust index after removal
  
          // End game if no lives remain
          if (this.lives === 0) {
            this.endGame();
            return;
          }
        }
        // Check if the obstacle has moved off the screen
        else if (obstacle.top > this.height) {
          obstacle.element.remove();
          this.obstacles.splice(i, 1); // Remove from array
          this.score++; // Increase score
          i--; // Adjust index after removal
        }
      }
    }
  
    // End game method
    endGame() {
      // Remove player and obstacles from the DOM
      this.player.element.remove();
      this.obstacles.forEach(obstacle => obstacle.element.remove());
  
      // Set game over flag and clear the interval
      this.gameIsOver = true;
      clearInterval(this.gameIntervalId);
  
      // Hide game screen and show end game screen
      this.gameScreen.style.display = "none";
      this.gameEndScreen.style.display = "block";
    }
  }
  
