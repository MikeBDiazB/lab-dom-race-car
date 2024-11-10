// js/script.js

window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  let game;

  startButton.addEventListener("click", function () {
    startGame();
  });

  // Function to start the game
  function startGame() {
    console.log("start game");
    game = new Game();
    game.start();

    // Once the game starts, reset the key event listeners
    resetKeyListeners();
  }

  // Function that handles keydown event for starting movement
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -1;
          break;
        case "ArrowUp":
          game.player.directionY = -1;
          break;
        case "ArrowRight":
          game.player.directionX = 1;
          break;
        case "ArrowDown":
          game.player.directionY = 1;
          break;
      }
    }
  }

  // Function that handles keyup event for stopping movement
  function handleKeyup(event) {
    const key = event.key;

    if (key === "ArrowLeft" || key === "ArrowRight") {
      game.player.directionX = 0;
    } else if (key === "ArrowUp" || key === "ArrowDown") {
      game.player.directionY = 0;
    }
  }

  // Function to reset the key event listeners for player movement
  function resetKeyListeners() {
    // Add event listeners for keydown and keyup events
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  }

  // Add event listener for restart button to restart the game
  restartButton.addEventListener("click", function () {
    restartGame();
  });

  // Function that reloads the page to restart the game
  function restartGame() {
    location.reload();
  }
};



