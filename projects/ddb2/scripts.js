const gameboard = document.getElementById("gameboard");
let ctx = gameboard.getContext("2d");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");
const startGameBtn = document.getElementById("startGameBtn");
let width = gameboard.width;
let height = gameboard.height;

let playerX = 250;
let playerY = 250;

const background = "white";
const playerColor = "black";
const enemyColor = 'red';
const unitSize = 20;
let speed = 1;
let running = false;
let score = 0;

let velX = 0;
let velY = 0


let enemies = []



window.addEventListener("keydown", changeDirection);
startGameBtn.addEventListener("click", resetGame);

function gameStart() {
    gameOver.style.visibility = "hidden";
    running = true;

    if (running) {
        drawEnemies();
        drawPlayer();

        setInterval(() => {
            if (running) {
                score += speed**1.01;
                score = Math.floor(score)
                scoreText.innerText = `${score}`
            }
        }, 50)
        let interval = 5000*speed;
        setInterval(() => {
            if (running) {
                drawEnemies();
                speed += 0.1/enemies.length;
            }
        }, 7000)

    };
};
gameStart();
function changeDirection(evt) {
    switch (evt.keyCode) {
        case 37: //left
            velX = -1;
            velY = 0;
            break;
        case 38:  //up
            velY = -1;
            velX = 0;
            break;
        case 39: //right
            velX = 1;
            velY = 0;
            break;
        case 40: //down
            velY = 1;
            velX = 0;
            break;
    }
};


function clearBoard() {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height)
};

function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX, playerY, unitSize, unitSize)

        ctx.clearRect(playerX, playerY, unitSize, unitSize)
        if ((playerX > width - unitSize && velX == 1) || playerX <= 0 && velX == -1) {
            velX = 0;
        }
        if ((playerY > height - unitSize && velY == 1) || playerY <= 0 && velY == -1) {
            velY = 0;
        }
        playerY += velY*speed;
        playerX += velX*speed;
        
        ctx.fillStyle = playerColor;
        ctx.fillRect(playerX, playerY, unitSize, unitSize)
};



function drawEnemies() {
    const randomWidth = Math.floor(Math.random() * (width-2*unitSize)) + unitSize;
    const randomHeight = Math.floor(Math.random() * (height-2*unitSize)) +  unitSize;

    let randomDirX = Math.random() * 2 - 1;
    let randomDirY = Math.random() * 2 - 1;

    const newEnemy = { x: randomWidth, y: randomHeight, dirX: randomDirX, dirY: randomDirY}

    
    setInterval(() => {
        ctx.fillStyle = enemyColor;
    ctx.fillRect(newEnemy.x, newEnemy.y, unitSize, unitSize)
    
    }, 1);

    setTimeout( () => {
        enemies.push(newEnemy)
    }, 600)
};

setInterval(() => {
    clearBoard();
    drawPlayer();
    enemies.forEach(enemy => {
        if (enemy.x > (width - unitSize) || enemy.x < (0)) {
            enemy.dirX = -enemy.dirX;
        }

        if (enemy.y > (height - unitSize) || enemy.y < (0)) {
            enemy.dirY = -enemy.dirY;
        }

        enemy.x += enemy.dirX*speed;
        enemy.y += enemy.dirY*speed;

        ctx.fillStyle = enemyColor;
        ctx.fillRect(enemy.x, enemy.y, unitSize, unitSize)

        if ((enemy.x < playerX + unitSize && enemy.x > playerX - unitSize) && (enemy.y < playerY + unitSize && enemy.y > playerY - unitSize) && running) {
            running = false;
            displayGameOver();  
        };
    })
}, 7)

function displayGameOver() {
    gameOver.style.visibility = "visible";
    let scoreElement = document.getElementById("gameOverScore");
    scoreElement.innerText = score;
};

function resetGame() {
    location.reload();

};



