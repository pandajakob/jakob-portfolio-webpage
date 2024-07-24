let jokeRunning = false;

const jokeElement = document.getElementById('joke');
const jokeURL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

document.addEventListener('click', fetchJoke)
document.addEventListener('keydown', fetchJoke)

async function fetchJoke() {
    if (!jokeRunning) {
    let i = 0;
    jokeRunning = true;

    const response = await fetch(jokeURL);
        if (response.ok) {
            const jsonResponse = await response.json();        
            let joke = ''
            let jokeString = ''

            if (jsonResponse.joke) {
                joke = jsonResponse.joke
                
            } else {
                joke = jsonResponse.setup + '<br>' + '...' + '<br>' + jsonResponse.delivery;
            }

            setInterval(() => {
                if (joke != jokeString) {
                    jokeString += joke[i];
                    jokeElement.innerHTML = jokeString;
                    i++;
                }
            }, 5)

            fetchYodaAnswer(joke);

        }
        jokeRunning = false
    }
} 

async function fetchYodaAnswer(joke) {
    const urlToFetch= "" + joke;
        
    const response = await fetch(urlToFetch);
    if (response.ok) {
        const jsonResponse = await response.json();

    }

}