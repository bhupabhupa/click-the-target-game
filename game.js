// Game state
let score = 0;
let misses = 0;
const MAX_MISSES = 3;
let gameActive = true;

// DOM elements
const gameScreen = document.getElementById('game-screen');
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const missesDisplay = document.getElementById('misses');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Initialize game
function initGame() {
    score = 0;
    misses = 0;
    gameActive = true;
    updateScore();
    updateMisses();
    gameOverScreen.classList.add('hidden');
    moveTarget();
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Update misses display
function updateMisses() {
    missesDisplay.textContent = misses;
}

// Move target to a random position
function moveTarget() {
    if (!gameActive) return;
    
    const gameScreenRect = gameScreen.getBoundingClientRect();
    const targetSize = 50;
    
    // Calculate random position within game screen bounds
    const maxX = gameScreenRect.width - targetSize;
    const maxY = gameScreenRect.height - targetSize;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.left = randomX + 'px';
    target.style.top = randomY + 'px';
}

// Handle target click
function handleTargetClick(event) {
    event.stopPropagation(); // Prevent game screen click event
    
    if (!gameActive) return;
    
    score++;
    updateScore();
    moveTarget();
    
    // Add click animation
    target.style.transform = 'scale(1.3)';
    setTimeout(() => {
        target.style.transform = 'scale(1)';
    }, 100);
}

// Handle game screen click (missed target)
function handleGameScreenClick(event) {
    if (!gameActive) return;
    
    // Check if click was on target
    if (event.target === target) return;
    
    misses++;
    updateMisses();
    
    // Check if game over
    if (misses >= MAX_MISSES) {
        endGame();
    }
}

// End game
function endGame() {
    gameActive = false;
    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// Restart game
function restartGame() {
    initGame();
}

// Event listeners
target.addEventListener('click', handleTargetClick);
gameScreen.addEventListener('click', handleGameScreenClick);
restartBtn.addEventListener('click', restartGame);

// Start the game when page loads
initGame();
