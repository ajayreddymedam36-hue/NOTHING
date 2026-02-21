const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");

const nameScreen = document.getElementById("nameScreen");
const startBtn = document.getElementById("startBtn");
const nameInput = document.getElementById("nameInput");

const crashScreen = document.getElementById("crashScreen");
const restartBtn = document.getElementById("restartBtn");
const finalScore = document.getElementById("finalScore");

const jumpBtn = document.getElementById("jumpBtn");
const pauseBtn = document.getElementById("pauseBtn");
const nameSubmitBtn = document.getElementById("nameSubmitBtn");
const descriptionScreen = document.getElementById("descriptionScreen");
const descriptionText = document.getElementById("descriptionText");
const debugBtn = document.getElementById("debugBtn");
const game = document.getElementById("game");

let playerName = "";
let score = 0;
let speed = 5;
let gameRunning = false;
let isPaused = false;

let obstacleInterval;
let scoreInterval;

/* Start After Name */

/* Step 2: Start Debugging */
debugBtn.onclick = () => {
    descriptionScreen.classList.add("hidden");
    startGame();
};

/* Step 1: Submit Name */
/* Step 1: Submit Name */
nameSubmitBtn.onclick = () => {

    playerName = nameInput.value.trim() || "Anonymous";

    nameScreen.classList.add("hidden");
    descriptionScreen.classList.remove("hidden");

    descriptionText.innerHTML = `
        <p class="text-1.5xl font-bold text-[#F5F5F5]"> ${playerName},  you're 🧑‍💻 deep in the code zone,<br>
        BUGS 🪲 are attacking your flawless logic! <br><br>

        Hit SPACE to ESCAPE</span> 
        from the bugs and survive.<br>
        One Wrong Move 🏃‍➡️ = TOTAL SYSTEM MELTDOWN 💻⚠️🚨.</span>
        <br><br>

        Will you crash like the rest…<br>
        or rise as a DEBUGGING LEGEND?<br><br>

        Hit SPACE and DOMINATE! 👊🔥
    </p>`;
};

function startGame() {

    score = 0;
    speed = 5;
    scoreEl.textContent = score;

    gameRunning = true;
    isPaused = false;

    obstacle.style.right = "-40px";

    obstacleInterval = setInterval(moveObstacle, 20);
    scoreInterval = setInterval(updateScore, 100);

    game.style.animationPlayState = "running";
}

/* Move Obstacle */
function moveObstacle() {

    let obstacleRight = parseInt(window.getComputedStyle(obstacle).right);
    obstacle.style.right = obstacleRight + speed + "px";

    if (obstacleRight > game.offsetWidth) {
        obstacle.style.right = "-40px";
    }

    checkCollision();
}

/* Score + Smooth Difficulty */
function updateScore() {

    if (!gameRunning || isPaused) return;

    score++;
    scoreEl.textContent = score;

    speed = 5 + (score * 0.05);
    if (speed > 18) speed = 18;
}

/* Jump */
function jump() {

    if (!gameRunning || isPaused) return;

    player.classList.remove("jump");
    void player.offsetWidth;
    player.classList.add("jump");
}

/* Pause */
function togglePause() {

    if (!gameRunning) return;

    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(obstacleInterval);
        clearInterval(scoreInterval);
        game.style.animationPlayState = "paused";
    } else {
        obstacleInterval = setInterval(moveObstacle, 20);
        scoreInterval = setInterval(updateScore, 100);
        game.style.animationPlayState = "running";
    }
}

/* Collision */
function checkCollision() {

    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.bottom > obstacleRect.top
    ) {
        endGame();
    }
}

/* Crash */
function endGame() {

    gameRunning = false;

    clearInterval(obstacleInterval);
    clearInterval(scoreInterval);

    game.classList.add("shake");

    setTimeout(() => {
        crashScreen.classList.remove("hidden");
        finalScore.innerHTML = `<p class="font-mono">${playerName}, Your Debugging Efficiency is ${score}.</br>
        The system believes you can do better.</br>
        Bugs are evolved... are you?🐞</br>
        <span class="text-[00E5FF]">Reboot.</span> Refocus. Debug again.</p>`;
    }, 400);
}

/* Restart */
restartBtn.onclick = () => {
    crashScreen.classList.add("hidden");
    game.classList.remove("shake");
    startGame();
};

/* Keyboard */
document.addEventListener("keydown", e => {
    if (e.code === "Space") jump();
    if (e.code === "KeyP") togglePause();
});

/* Mobile Buttons */
jumpBtn.addEventListener("click", jump);
pauseBtn.addEventListener("click", togglePause);