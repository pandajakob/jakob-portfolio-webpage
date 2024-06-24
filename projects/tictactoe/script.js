let boxes = Array.from(document.getElementsByClassName("box"));
let X_Text = "X";
let O_Text = "O";
let spaces = Array(9).fill(null);

let currentPlayer = X_Text;

const winningCombos = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2]
];

const playerScoreElement = document.getElementById("playerScore")
const computerScoreElement = document.getElementById("computerScore")
let computerScore = 0;
let playerScore = 0;

function boxClicked(e) {

    const id = e.target.id;
    if (!spaces[id] && currentPlayer === X_Text) {
        spaces[id] = currentPlayer;
        e.target.innerHTML = currentPlayer;
        currentPlayer = currentPlayer == X_Text ? O_Text : X_Text;
        if (validateGame) {
            setTimeout(playComputerTurn, 200);
        }
    }
    console.log("spaces", spaces)

};

boxes.forEach(box => {
    box.addEventListener("click",  boxClicked)
});


const restartGame = () => {
    spaces.fill(null);
    boxes.forEach(box => { 
        box.innerHTML = "";
        box.style.backgroundColor =  "var(--bgColor)"
    })
    playerScoreElement.innerHTML = playerScore;
    computerScoreElement.innerHTML = computerScore;
    currentPlayer = X_Text;
}


// adds eventListeners for each gameField
const playComputerTurn = () => {
    let freeSpaces = getFreeSpaces(spaces);
    
    if (freeSpaces.length > 1) {
        const i = minimax(freeSpaces);
        if (i !== null) {
        boxes[i].innerHTML = O_Text;
        spaces[i] = O_Text;
        currentPlayer = X_Text;
        }
    }
    validateGame();
};

const validateGame = () => {
    let gameContinues = true;
    winningCombos.some(combo => {
        let [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            showWinningCombo(combo);
            spaces[a] === X_Text ? playerScore++ : computerScore++;
            setTimeout(() => {window.alert(`${spaces[a]} wins!`)
            restartGame();
            }, 100)
            gameContinues = false;
            return true
        } else if (!spaces.includes(null)) {
            setTimeout(() => {window.alert(`Tie`)
            restartGame();
            }, 100)
            gameContinues = false;
            return true
        }
        return false
    })

    return gameContinues;
};

const showWinningCombo = (combo) => {
    combo.forEach(i => {
        boxes[i].style.backgroundColor = "var(--darkBG)";
    }) 
}

const checkGame = (spaces) => {
    let rating = 0;
    winningCombos.forEach(combo => {
        let [a, b, c] = combo;

        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
           let winner = spaces[a] === X_Text ? rating = -1 : rating = 1;
            console.log("winner",winner)
        }
    })
    return rating
}

const idOfMax = (array) => {
    let max = Math.max(...array);
    console.log("max", max)
    let maxIndex = array.indexOf(max);
    console.log("maxIndex", maxIndex)

    return maxIndex;

}

const getFreeSpaces = (array) => {

    let freeSpaces = []
    array.forEach((space, i) => {
        if (!space) {
            freeSpaces.push(i)
        }
    })

    return freeSpaces;

}


const goThrough = (array) => {
    for (let i = 0; i < array.length; i++) {

    }
}

const minimax = (freeSpaces) => {
    let returnID = null;
    let testSpaces = []
    spaces.forEach(space => {
        testSpaces.push(space)
    }) 


    let optionRating = [];


    for (let i1 = 0; i1 < freeSpaces.length; i1++) {
        console.log("")
        let ratings = []
        
        testSpaces[freeSpaces[i1]] = O_Text;
        
        console.log("Test space for O:", freeSpaces[i1]);
       
       
        let newFreeSpaces = getFreeSpaces(testSpaces);

        console.log("newfreespaces", newFreeSpaces);
            if (newFreeSpaces.length > 1) {
                for (let i2 = 0; i2 < newFreeSpaces.length; i2++) {
                    console.log("Test space for X:", newFreeSpaces[i2]);
                    testSpaces[newFreeSpaces[i2]] = X_Text;
                    ratings.push(checkGame(testSpaces))
                    testSpaces[newFreeSpaces[i2]] = null;
                }
                optionRating.push(Math.min(...ratings));
            } else {
                optionRating.push(checkGame(testSpaces))
            }
        console.log("ratings: ", ratings);
      
        ratings = [];
        testSpaces[freeSpaces[i1]] = null;
    }

    console.log("optionRating", optionRating)

    console.log("testspaces", testSpaces)

    let id = idOfMax(optionRating);

    returnID = freeSpaces[id];

    console.log("minimax", returnID)

    return returnID;
    
}