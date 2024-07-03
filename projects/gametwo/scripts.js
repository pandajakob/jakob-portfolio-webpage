const gameboard = document.getElementById("gameboard");
const ctx = gameboard.getContext("2d");
const scoreText = document.getElementById("score");

let width = gameboard.width;
let height = gameboard.height;

const background = "white";
const playerColor = "black";
const enemyColor = "red";

const unitSize = 20;

let speed = 1;

let running = false;


let score = 0;

window.addEventListener("keydown", changeDirection);
function gameStart(){ 
    drawEnemies();
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
function changeDirection(){ };

function clearBoard() { 
    ctx.fillstyle = background;
    ctx.fillRect(0, 0, width, height)

};

function drawPlayer() { };

function drawEnemies() { 
    const randomWidth = Math.floor(Math.random()*width-unitSize*2) + unitSize;
    const randomHeight = Math.floor(Math.random()*height-unitSize*2) + unitSize;



    let enemyX = randomWidth;
    let enemyY = randomHeight;

    let randomDirX = Math.floor(Math.random()*3) - 1;
    let randomDirY =  Math.floor(Math.random()*3) - 1;

    if (randomDirX && randomDirY == 0) {
        randomDirY = -1;
    }

    ctx.fillRect(enemyX, enemyY, unitSize, unitSize)

    setInterval(()=> {
        ctx.clearRect(enemyX, enemyY, unitSize, unitSize);


     
        if (enemyX > (width-unitSize) || enemyX < (0)) {
            randomDirX = randomDirX === 1 ? -1 : 1;
        } 

        if (enemyY > (height-unitSize) || enemyY < (0)) {
            randomDirY = randomDirY === 1 ? -1 : 1;
        } 
        enemyX += randomDirX*speed;
        enemyY += randomDirY*speed;
        
        ctx.fillstyle = enemyColor;
        ctx.fillRect(enemyX, enemyY, unitSize, unitSize);
       
    }, 20)
  
};


function checkGameOver() { };

function displayGameOver() { };

function resetGame() { };



