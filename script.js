const gameState = {
  levelIndex: 0,
  levels: ["Atlanta", "Savannah", "Athens", "Blue Ridge"],
  score: 0,
  currentItem: "plastic bottle"
};

const item = document.getElementById("item");
const wizard = document.getElementById("wizard");
const scoreDisplay = document.getElementById("score");
const locationDisplay = document.getElementById("location");

item.addEventListener("dragstart", e => {
  e.dataTransfer.setData("text/plain", gameState.currentItem);
});

document.querySelectorAll(".cauldron").forEach(cauldron => {
  cauldron.addEventListener("dragover", e => e.preventDefault());
  cauldron.addEventListener("drop", e => {
    const choice = cauldron.id;
    evaluateChoice(gameState.currentItem, choice);
  });
});

function evaluateChoice(item, choice) {
  // Mock AI logic (replace with OpenAI call later)
  let points = 0;
  let message = "";

  if (item === "plastic bottle" && choice === "recycle") {
    points = 20;
    message = "Excellent transmutation! Recycling plastic reduces urban waste ✨";
  } else {
    points = 5;
    message = "Not ideal, but every effort has some magic 🪄";
  }

  gameState.score += points;
  scoreDisplay.textContent = `Sustainability Power: ${gameState.score}`;
  wizard.textContent = `🧙‍♂️ Wizard: ${message} (+${points})`;

  nextItemOrLevel();
}

function nextItemOrLevel() {
  gameState.levelIndex++;
  if (gameState.levelIndex < gameState.levels.length) {
    locationDisplay.textContent = gameState.levels[gameState.levelIndex];
    wizard.textContent += " New location unlocked!";
  } else {
    wizard.textContent = "🧙‍♂️ You have restored balance to Georgia! 🌍";
  }
}
function startGame() {
  // Hide home screen
  document.getElementById("homeScreen").style.display = "none";

  // Show game screen
  document.getElementById("gameScreen").style.display = "block";

  // Initialize any game elements if needed
  document.getElementById("levelTitle").textContent = "Level 1: Enchanted City Cleanup";
  document.getElementById("score").textContent = "✨ Sustainability Power: 0";
}

function loadLevel(levelIndex) {
   const bgElement = document.getElementById('locationBg');
bgElement.style.backgroundImage = `url('images/${level.bgImage}')`; // make sure level.bgImage is the filename
bgElement.style.backgroundSize = 'cover';
bgElement.style.backgroundPosition = 'center';
bgElement.style.backgroundRepeat = 'no-repeat';

}
