const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");
const scoreText = document.getElementById("score");

let width = gameboard.width;
let height = gameboard.height;

let playerX = 250;
let playerY = 250;

const background = "white";
const playerColor = "black";
const enemyColor = 'red';
const unitSize = 20;
let speed = 2;
let running = false;
let score = 0;

let velX = 0;
let velY = 0

window.addEventListener("keydown", changeDirection);

function gameStart(){ 
    drawEnemies();
    drawPlayer();

    setInterval(()=> {
        score += 1*speed;
        scoreText.innerText = `${score}`
    }, 100)

    setInterval(()=> {
        drawEnemies();
        speed += 1;
    }, 10000)

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
    ctx.fillstyle = background;
    ctx.fillRect(0, 0, width, height)

};

function drawPlayer() {
    ctx.fillStyle = playerColor;
    ctx.fillRect(playerX, playerY, unitSize, unitSize)

    setInterval(()=>{
        ctx.clearRect(playerX, playerY, unitSize, unitSize)
        if ((playerX > width-unitSize && velX == 1) || playerX <= 0 && velX == -1) {
            velX = 0;
        } 
        if ((playerY > height-unitSize && velY == 1) || playerY <= 0 && velY == -1) {
            velY = 0;
        } 
        playerY += velY;
        playerX += velX;
        ctx.fillStyle = playerColor;
        ctx.fillRect(playerX, playerY, unitSize, unitSize)
    },2)
};



function drawEnemies() { 
    const randomWidth = Math.floor(Math.random()*(width-2*unitSize)) + 2*unitSize;
    const randomHeight = Math.floor(Math.random()*(height-2*unitSize)) + 2*unitSize;

    let enemyX = randomWidth;
    let enemyY = randomHeight;

    let randomDirX = Math.floor(Math.random()*3) - 1;
    let randomDirY =  Math.floor(Math.random()*3) - 1;

    if (randomDirX && randomDirY == 0) {
        randomDirY = -1;
    }   
    ctx.fillStyle = enemyColor;
    ctx.fillRect(enemyX, enemyY, unitSize, unitSize)

    setInterval(()=> {
        ctx.clearRect(enemyX, enemyY, unitSize, unitSize);
        ctx.fillStyle = enemyColor;

        if (enemyX > (width-unitSize) || enemyX < (0)) {
            randomDirX = randomDirX === 1 ? -1 : 1;
        } 

        if (enemyY > (height-unitSize) || enemyY < (0)) {
            randomDirY = randomDirY === 1 ? -1 : 1;
        } 
        
        enemyX += randomDirX*(Math.floor(speed/4)+1);
        enemyY += randomDirY*(Math.floor(speed/4)+1);
        
        
        ctx.fillRect(enemyX, enemyY, unitSize, unitSize);
       
    }, 5)
  
};


function checkGameOver() { };

function displayGameOver() { };

function resetGame() { };



