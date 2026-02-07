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

function loadLevel() {
  const level = LEVELS[currentLevel];
  document.getElementById("levelTitle").innerText = level.name;
  document.getElementById("score").innerText =
    "✨ Sustainability Power: " + score;

  // Full screen background
  document.body.style.backgroundImage = `url('images/${level.bgImage}')`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundRepeat = 'no-repeat';


  remainingItems = shuffle([...level.items]);
  renderItems();
}

function renderItems() {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  const containerWidth = container.clientWidth;
  const containerHeight = container.clientHeight;

  remainingItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";
    div.draggable = true;
    div.dataset.item = item.name; // use your LEVELS structure
    div.innerText = `${item.emoji} ${item.name}`;

    // Randomly position inside container
    const x = Math.random() * (containerWidth - 150); // 150 = item width
    const y = Math.random() * (containerHeight - 50); // 50 = approx item height
    div.style.left = x + "px";
    div.style.top = y + "px";

    div.addEventListener("dragstart", () => draggedItem = item);

    container.appendChild(div);
  });
}
