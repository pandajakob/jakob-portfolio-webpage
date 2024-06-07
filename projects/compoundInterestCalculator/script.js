
const button = document.getElementById('button')

function newElement(event) {
    const parent = document.getElementById('ul')

    for (let i = 0; i < 4; i++) {
        const element = document.createElement('li');
        let number = (i * 3)/4;
        element.innerHTML = `${i} ` + `${event.target}`;
        parent.appendChild(element);
    }
}
button.addEventListener('click', newElement);

