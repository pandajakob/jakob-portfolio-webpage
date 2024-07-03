const playerElement = document.getElementById("player");
const gameboard = document.getElementById("gameboard");



const checkKeyPressed = (evt) => {
    const leftPosition = parseInt(getComputedStyle(playerElement).getPropertyValue("left"))
    const topPosition = parseInt(getComputedStyle(playerElement).getPropertyValue("top"))
    const move = 20;

    switch (evt.keyCode) {
    case 37: //left
        if (leftPosition > 0 ) {
        playerElement.style.setProperty("left", `${leftPosition-move}px`);
        }
        break;
    case 38:  //up
        if (topPosition > 0 ) {
        playerElement.style.setProperty("top", `${topPosition-move}px`);
        }
        break;
    case 39: //right
        if (leftPosition < 780 ) {
        playerElement.style.setProperty("left", `${leftPosition+move}px`);
        }
        break;
    case 40: //down
        if (topPosition < 780 ) {
        playerElement.style.setProperty("top", `${topPosition+move}px`);
        }
        break;

    } 

    checkWin();

}
const setEnemies = () => {
    let enemies = Array.from(document.getElementsByClassName('enemy'))

    enemies.forEach(element => {
            gameboard.removeChild(element);
    });
    
    for (let i = 1; i<7; i++) {
        const randomAni = Math.floor(Math.random()*2);
        const randomSpeed = parseFloat(Math.random()*3 + 0.5);
        const enemy = document.createElement("div");
        enemy.classList.add("enemy")
        enemy.id = i;
        enemy.style.top = `${100*i}px`;
        enemy.style.animation = randomAni === 1 ? `enemyRight ${randomSpeed}s infinite linear` : `enemyRight ${randomSpeed}s infinite linear reverse`;

        gameboard.appendChild(enemy);
    }
}
setEnemies();
window.addEventListener("keydown", checkKeyPressed, false);

const checkWin = () => {
    const pos = parseInt(getComputedStyle(playerElement).getPropertyValue("top"))
    if (pos == 780) {
        window.alert("you win!")
        setEnemies();
        playerElement.style.top = "0px"
    } 
}




const win = () => {
    let enemies = Array.from(document.getElementsByClassName('enemy'));

    const characterTop = parseInt(getComputedStyle(playerElement).getPropertyValue("top"))
    const characterLeft = parseInt(getComputedStyle(playerElement).getPropertyValue("left"))
    
    enemies.forEach((enemy, i)=> {
        const num = 1+i;
        const enemyTop = parseInt(getComputedStyle(enemy).getPropertyValue("top"));
        const enemyleft = parseInt(getComputedStyle(enemy).getPropertyValue("left"))
    
        if (characterTop == enemyTop+20*num && (characterLeft <= enemyleft + 20 && characterLeft >= enemyleft - 20)) {
            window.alert("u lose");
            playerElement.style.top = "0px";
            setEnemies();

        }
    })
}

setInterval(win, 5)

