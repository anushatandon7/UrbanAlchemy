const LEVELS = [
    { name:'Atlanta', items:[
        {emoji:'🥤', name:'Plastic Bottle', category:'recycle'},
        {emoji:'📰', name:'Newspaper', category:'recycle'},
        {emoji:'🍌', name:'Banana Peel', category:'compost'},
        {emoji:'📱', name:'Old Phone', category:'recycle'},
        {emoji:'📦', name:'Cardboard Box', category:'recycle'}
    ]},
    { name:'Savannah', items:[
        {emoji:'🥫', name:'Aluminum Can', category:'recycle'},
        {emoji:'🍃', name:'Leaves', category:'compost'},
        {emoji:'🐚', name:'Seaweed', category:'compost'},
        {emoji:'🪮', name:'Old Comb', category:'recycle'},
        {emoji:'🥕', name:'Carrot Scraps', category:'compost'},
        {emoji:'🛢️', name:'Oil Can', category:'recycle'}
    ]}
];

const gameState = { currentLevel:0, score:0, itemsProcessed:0, cauldronCounts:{recycle:0, compost:0}, draggedItem:null };

const startModal = document.getElementById('startModal');
const itemsContainer = document.getElementById('itemsContainer');
const wizardDialog = document.getElementById('wizardDialog');

document.getElementById('startGameBtn').onclick = () => {
    startModal.classList.add('hidden');
    loadLevel(0);
};

document.getElementById('homeBtn').onclick = () => location.reload();
document.getElementById('playAgainBtn').onclick = () => location.reload();

function loadLevel(levelIndex){
    gameState.currentLevel = levelIndex;
    gameState.itemsProcessed=0;
    gameState.cauldronCounts={recycle:0,compost:0};
    document.getElementById('locationName').textContent = LEVELS[levelIndex].name;
    document.getElementById('levelNum').textContent = levelIndex+1;
    itemsContainer.innerHTML='';
    generateItems();
    updateUI();
}

function generateItems(){
    const level = LEVELS[gameState.currentLevel];
    level.items.forEach(item=>{
        const itemEl = document.createElement('div');
        itemEl.className='item';
        itemEl.draggable=true;
        itemEl.innerHTML=item.emoji;
        itemEl.dataset.category=item.category;
        itemEl.dataset.name=item.name;
        itemsContainer.appendChild(itemEl);

        itemEl.addEventListener('dragstart', e=>{ gameState.draggedItem=item; e.target.classList.add('dragging'); });
        itemEl.addEventListener('dragend', e=>{ e.target.classList.remove('dragging'); });
    });
}

['Recycle','Compost'].forEach(type=>{
    const cauldron = document.getElementById(`cauldron${type}`);
    cauldron.addEventListener('dragover', e=>{ e.preventDefault(); cauldron.classList.add('drag-over'); });
    cauldron.addEventListener('dragleave', ()=>{ cauldron.classList.remove('drag-over'); });
    cauldron.addEventListener('drop', e=>{
        e.preventDefault(); cauldron.classList.remove('drag-over');
        if(gameState.draggedItem) handleDrop(type.toLowerCase(), gameState.draggedItem);
    });
});

function handleDrop(cauldronType,item){
    const isCorrect=item.category===cauldronType;
    showWizardMessage(isCorrect?`✨ Correct! ${item.name} goes here!`:`⚡ Try the other cauldron!`);
    gameState.score += isCorrect?20:5;
    gameState.itemsProcessed++;
    gameState.cauldronCounts[cauldronType]++;
    document.querySelectorAll('.item').forEach(el=>{
        if(el.dataset.name===item.name) el.remove();
    });
    updateUI();
    if(gameState.itemsProcessed >= LEVELS[gameState.currentLevel].items.length){
        setTimeout(completeLevel,1500);
    }
}

function showWizardMessage(message){
    document.getElementById('wizardMessage').textContent=message;
    wizardDialog.style.display='block';
    setTimeout(()=>wizardDialog.style.display='none',3000);
}

function updateUI(){
    document.getElementById('scoreDisplay').textContent=`Score: ${gameState.score}`;
    document.getElementById('recycleCount').textContent=gameState.cauldronCounts.recycle;
    document.getElementById('compostCount').textContent=gameState.cauldronCounts.compost;
}

function completeLevel(){
    const modal=document.getElementById('levelCompleteModal');
    const content=document.getElementById('modalContent');
    content.innerHTML=`<strong>Great job cleaning up ${LEVELS[gameState.currentLevel].name}!</strong><br>
        Score: ${gameState.score}<br>
        Items sorted: ${gameState.itemsProcessed}`;
    const nextBtn=document.getElementById('nextLevelBtn');
    if(gameState.currentLevel<LEVELS.length-1){
        nextBtn.style.display='inline-block';
        nextBtn.onclick=()=>{ modal.classList.remove('active'); loadLevel(gameState.currentLevel+1);}
    } else nextBtn.style.display='none';
    modal.classList.add('active');
}
