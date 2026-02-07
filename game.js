const LEVELS = [
  {
    city: 'Atlanta',
    items: [
      { name: 'Plastic Bottle', emoji: '🧴', category: 'recycle' },
      { name: 'Cardboard Box', emoji: '📦', category: 'recycle' },
      { name: 'Banana Peel', emoji: '🍌', category: 'compost' }
    ]
  },
  {
    city: 'Athens',
    items: [
      { name: 'Apple Core', emoji: '🍎', category: 'compost' },
      { name: 'Notebook', emoji: '📓', category: 'recycle' },
      { name: 'Coffee Grounds', emoji: '☕', category: 'compost' }
    ]
  }
];

const state = {
  level: 0,
  score: 0,
  queue: [],
  activeItem: null
};

function startGame() {
  document.getElementById('start-modal').style.display = 'none';
  loadLevel();
}

function goHome() {
  location.reload();
}

function loadLevel() {
  const level = LEVELS[state.level];
  document.getElementById('location').textContent = level.city;
  state.queue = shuffle([...level.items]);
  spawnNextItem();
}

function spawnNextItem() {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';

  if (state.queue.length === 0) {
    state.level++;
    if (state.level < LEVELS.length) {
      showWizard(`✨ Level complete! The magic now shifts to ${LEVELS[state.level].city}.`);
      setTimeout(loadLevel, 2000);
    } else {
      showWizard('🌟 You have mastered Urban Alchemy and restored balance to Georgia!');
    }
    return;
  }

  const item = state.queue.shift();
  state.activeItem = item;

  const el = document.createElement('div');
  el.className = 'item';
  el.textContent = item.emoji;
  el.draggable = true;
  el.ondragstart = () => (state.activeItem = item);

  container.appendChild(el);
}

function allowDrop(e) {
  e.preventDefault();
}

async function dropItem(choice) {
  const item = state.activeItem;
  if (!item) return;

  const correct = item.category === choice;
  state.score += correct ? 20 : 5;
  document.getElementById('score').textContent = state.score;

  const response = await fetch('http://localhost:3000/wizard', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: item.name, choice, city: LEVELS[state.level].city })
  });

  const data = await response.json();
  showWizard(data.text);

  if (correct) {
    setTimeout(spawnNextItem, 1200);
  }
}

function showWizard(text) {
  const wiz = document.getElementById('wizard');
  wiz.innerHTML = `🧙‍♀️ <strong>Wizard:</strong><br>${text}`;
  wiz.style.display = 'block';
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
