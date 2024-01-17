const choices = ["X", "O"];
const random = Math.floor(Math.random() * 2);
let currentTurn = choices[random];
const h2 = document.getElementById("turnh2");
h2.textContent = `${currentTurn.toUpperCase()}'s Turn `;
let boxes = document.querySelectorAll(".area");
let gameActive = true; // Flag to control game state

function setupGame() {
  document
    .getElementById("restartButton")
    .addEventListener("click", restartGame);

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (!box.querySelector("h1") && gameActive) {
        const h1 = document.createElement("h1");
        h1.textContent = currentTurn;
        box.appendChild(h1);

        if (h1.textContent === "O") {
          box.style.backgroundColor = "lightgray";
        } else {
          box.style.backgroundColor = "darkgrey";
        }

        const result = checkBoard(); // Check for winner or draw
        if (result) {
          h2.textContent = result === "Draw" ? "Draw!" : `Winner: ${result}`;
          gameActive = false; // Stop the game
        } else {
          // Switch turns if game is still active
          currentTurn = currentTurn === "X" ? "O" : "X";
          updateTurnDisplay(); // Update the display to show whose turn it is
        }
      }
    });
  });
}

function updateTurnDisplay() {
  const h2 = document.getElementById("turnh2");
  h2.textContent = `${currentTurn}'s Turn`;
}

function checkBoard() {
  const textBox = (id) => document.getElementById(id).textContent;
  const combos = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  for (let combination of combos) {
    if (
      textBox(combination[0]) !== "" &&
      textBox(combination[0]) === textBox(combination[1]) &&
      textBox(combination[1]) === textBox(combination[2])
    ) {
      combination.forEach((id) => {
        document.getElementById(id).classList.add("glow");
      });
      return textBox(combination[0]);
    }
  }

  const allBoxesFilled = [...Array(9).keys()].every(
    (i) => textBox((i + 1).toString()) !== ""
  );
  if (allBoxesFilled) {
    return "Draw";
  }

  return null;
}

function restartGame() {
  // Reset each box in the game
  boxes.forEach((box) => {
    box.innerHTML = ""; // Clear the content
    box.style.backgroundColor = ""; // Reset background color
    box.classList.remove("glow"); // Remove glow effect if any
  });

  // Reset game state
  gameActive = true;
  currentTurn = choices[Math.floor(Math.random() * 2)]; // Randomly choose who starts
  updateTurnDisplay(); // Update the display with the new current turn
}

setupGame(); // Initialize the game
