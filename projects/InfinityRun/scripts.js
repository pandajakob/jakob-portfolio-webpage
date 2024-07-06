const main = document.querySelector('main') 
const runner = document.getElementById('runner');

window.addEventListener('keydown', keyPressed)

let inJump = false;

function keyPressed(evt) {
        const keyCode = evt.keyCode;
        console.log(keyCode)
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
       main.appendChild(object)
       setInterval(() => { main.removeChild(object)}, 5000)
}, 6000)

setInterval(() => {
        
})