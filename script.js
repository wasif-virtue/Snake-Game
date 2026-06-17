const board = document.querySelector(".board");
const modal = document.querySelector(".modal");
const startBtn = document.querySelector(".btn-start");
const restartBtn = document.querySelector(".btn-restart");
const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;
const startGameModal = document.querySelector(".start-game");
const restartGameModal = document.querySelector(".game-over");
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let IntervalId = null;
let timerIntervalId = null;
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

const blocks = [];
let snake = [
  {
    x: 1,
    y: 3,
  },
];

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00:00`;
let direction = "right";

highScore.innerText = highScore;

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    blocks[`${row},${col}`] = block;
  }
}

function render() {
  blocks[`${food.x},${food.y}`].classList.add("food");
  let head = null;
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }
  if (head < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(IntervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    restartGameModal.style.display = "flex";
    return;
  }

  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.remove("fill");
  });

  if (head.x === food.x && head.y === food.y) {
    blocks[`${food.x},${food.y}`].classList.remove("food");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    blocks[`${food.x},${food.y}`].classList.add("food");
    snake.unshift(head);
    score += 10;
    scoreElement.innerText = score;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
      highScoreElement.textContent = highScore;
    }
  }

  snake.unshift(head);
  snake.pop();
  snake.forEach((segment) => {
    blocks[`${segment.x},${segment.y}`].classList.add("fill");
  });
}

startBtn.addEventListener("click", () => {
   IntervalId = setInterval(() => {render()}, 300);
  modal.style.display = "none";
  timerIntervalId = setInterval(() => {
  let [min, sec] = time.split(":").map(Number);
    if(sec==59){
        min += 1;
        sec = 0;
    } else {
        sec += 1;
    }
    time = `${min}:${sec}`;
    timeElement.innerText = time;
}, 1000);

});

addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowRight") {
    direction = "right";
  } else if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  }
});

restartBtn.addEventListener("click", restartGame)
function restartGame(){
    modal.style.display = "none";
    blocks[`${food.x},${food.y}`].classList.remove("food");
    snake.forEach((segment) => {
        blocks[`${segment.x},${segment.y}`].classList.remove("fill");
    });
    snake = [
        { x: 1, y: 3 },
    ];
    direction = "right";
    score = 0;
    time = `00:00`;
    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };
    IntervalId = setInterval(render, 300);
}


