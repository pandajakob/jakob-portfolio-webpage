const main = document.querySelector('main') 
const runner = document.getElementById('runner');
const scoreText = document.getElementById('scoreText');
window.addEventListener('keydown', keyPressed)

let inJump = false;
let running = true;

let score = 0;
function keyPressed(evt) {
        const keyCode = evt.keyCode;
        if (keyCode == 38 || keyCode == 32 && !inJump) {
                inJump = true;
                runner.classList = "animation"
                setTimeout(() => {
                        inJump = false;
                }, 700)
                setTimeout(() => {
                        runner.classList = ""
                }, 1000)
        }

        if (keyCode == '39') {
                let leftValue = parseInt(getComputedStyle(runner).left);
                if (leftValue < 1200) {
                leftValue += 100;
                runner.style.left = `${leftValue}px`;
                }
        }
        if (keyCode == '37') {
                let leftValue = parseInt(getComputedStyle(runner).left);
                if (leftValue > 0) {
                leftValue -= 100;
                runner.style.left = `${leftValue}px`;
                }
        }

}
setInterval(() => {
        if (!inJump) {
                runner.src = "ressources/capybarra2.gif";
        }
}, 280)

setInterval(() => {
       let object = document.createElement('img');
       object.src = "ressources/treestump.webp"
       object.classList = 'object'; 
       object.id = 'object'; 

        object.style.zIndex = '0';
       main.appendChild(object)
       setInterval(() => { main.removeChild(object)}, 3400)
}, 3500)

setInterval(() => {
        const obj = document.getElementById("object");
        let margin = 20;
        if (obj) { 
        const objectTop = parseInt(getComputedStyle(obj).top);
        const objectLeft = parseInt(getComputedStyle(obj).left);

        const runnerTop = parseInt(getComputedStyle(runner).top);
        const runnerLeft = parseInt(getComputedStyle(runner).left);

        if ((objectTop < runnerTop + margin && objectTop > runnerTop-margin) && (objectLeft < runnerLeft-60 && objectLeft > runnerLeft-400) && running) {
                running = false;
                inJump = true;
                runner.style.top = "1000px";
                runner.style.transform = "rotate(9000deg)";
                displayGameOver();
        }
        }

}, 1);
setInterval(() => {
        if (running) {
        score += 0.1;
        score *= 1.0001;
        scoreText.innerHTML = `score: ${parseInt(score)}`
        }
        
}, 10)

function displayGameOver() {
document.getElementById("gameOver").style.display = "block";
}