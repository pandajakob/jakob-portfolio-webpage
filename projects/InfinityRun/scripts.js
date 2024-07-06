const main = document.querySelector('main') 
const runner = document.getElementById('runner');

window.addEventListener('keydown', keyPressed)

let inJump = false;

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

}
setInterval(() => {
        if (!inJump) {
                runner.src = "ressources/capybarra2.gif";
        }
}, 280)

setInterval(() => {
       let object = document.createElement('div');
       object.style.width = "100px";
       object.style.height = "100px";
       object.style.backgroundColor = "blue";


       object.style.animation = "animation: animatedBackground 1s linear infinite;";
       main.appendChild(object)

       
}, 3000)