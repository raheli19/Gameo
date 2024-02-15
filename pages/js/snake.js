/**The javascript code for the snake game. In every activation of the games, 
 * foods appears in the screen an the snake can eat the elements food and grow with them */

const playBoard = document.querySelector(".board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodList = [];
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let isHeadDisplayed = false;

// Getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Calling setDirection on each key click and passing key dataset value as an object
controls.forEach(button => button.addEventListener("click", () => setDirection({ key: button.dataset.key })));
//every time the snake eats an element food, we add a new element food 
const updateFoodPosition = () => {
    if (foodList.length < 10) {
        const newFood = {
            x: Math.floor(Math.random() * 30) + 1,
            y: Math.floor(Math.random() * 30) + 1
        };
        foodList.push(newFood);
    }
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to continue...");
    location.reload();
}

const setDirection = (e) => {
    if (gameOver) return handleGameOver();
    if (e.key.includes("Arrow") && e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    switch (e.key) {
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        default:
            break;
    }
}

const initGame = () => {
    if (gameOver) return handleGameOver();
    let html = '';

    // Add all food elements to the HTML
    foodList.forEach(food => {
        html += `<div class="food" style="grid-area: ${food.y} / ${food.x}"></div>`;
    });

    // Checking if the snake hit any of the food elements
    const eatenFoodIndexes = [];
    foodList.forEach((food, index) => {
        if (snakeX === food.x && snakeY === food.y) {
            snakeBody.push([food.y, food.x]); // Pushing food position to snake body array
            eatenFoodIndexes.push(index);
            score++; // increment score by 1
            highScore = score >= highScore ? score : highScore;
            localStorage.setItem("high-score", highScore);
            scoreElement.innerText = `Score: ${score}`;
            highScoreElement.innerText = `High Score: ${highScore}`;
        }
    });

    // Remove eaten food elements from the list
    eatenFoodIndexes.forEach(index => {
        foodList[index] = {
            x: Math.floor(Math.random() * 30) + 1,
            y: Math.floor(Math.random() * 30) + 1
        };
    });

    // Updating the snake's head position based on the current velocity
    snakeX += velocityX;
    snakeY += velocityY;

    // Shifting forward the values of the elements in the snake body by one
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY]; // Setting the first element of the snake body to the current snake position

    // Checking if the snake's head is out of the wall, if so, setting gameOver to true
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // Add the snake elements to the HTML
    for (let i = 0; i < snakeBody.length; i++) {
        const isHead = i === 0;
        const segmentClass = isHead ? 'head' : 'body';
        const imageUrl = isHead ? 'head.jpg' : 'bodygreen.jpg';

        html += `<div class="${segmentClass}" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}; background: url('../../assets/gamesPicture/${imageUrl}') center center/cover;"></div>`;

        // Checking if the snake head hit the body, if so, set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    playBoard.innerHTML = html;
}

// Initial food setup
for (let i = 0; i < 10; i++) { // Add initial 10 food elements
    updateFoodPosition();
}

setIntervalId = setInterval(initGame, 200);//initgame every 200ml seconde and set the velocity of the snake
document.addEventListener("keyup", setDirection);
