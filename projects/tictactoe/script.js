let boxes = Array.from(document.getElementsByClassName("box"));
let X_Text = "X";
let O_Text = "O";
let spaces = Array(9).fill(null);

const diffElements = Array.from(document.getElementsByClassName("pickerButton"));
let difficulty = 2;

diffElements.forEach(e => {
    e.addEventListener("click", setDifficulty)
})

function setDifficulty(e) {
    const id = e.target.id;
    if (id === "diff1") {
        difficulty = 2;
    }
    else if (id === "diff2") {
        difficulty = 4;
    }
    else if (id === "diff3") {
        difficulty = 8;
    }
    diffElements.forEach(element => {
        element.style.backgroundColor = "gainsboro";
    })

    document.getElementById(id).style.background = 'var(--darkBG)';



};

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

};

boxes.forEach(box => {
    box.addEventListener("click", boxClicked)
    
});



const restartGame = () => {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.backgroundColor = "var(--bgColor)"
    })
    playerScoreElement.innerHTML = playerScore;
    computerScoreElement.innerHTML = computerScore;
    currentPlayer = X_Text;
}


const showWinningCombo = (combo) => {
    combo.forEach(i => {
        boxes[i].style.backgroundColor = "var(--darkBG)";
    })
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



const checkGame = (gamespaces) => {
    let game = true;
    winningCombos.some(combo => {
        let [a, b, c] = combo;
        if (gamespaces[a] && gamespaces[a] === gamespaces[b] && gamespaces[a] === gamespaces[c]) {
            game = false;
            return true;
        }
    });

    if (game && getFreeSpaces(gamespaces).length === 0) {
        game = false;
    }

    return game ;
}

const playComputerTurn = () => {
    if (checkGame(spaces)) {

        let children = getChildren(spaces, O_Text);
        
        let minimaxArray = []

        children.forEach(child => {
            minimaxArray.push(minimax(child, difficulty, X_Text));
        })

        let maxEval = Math.max(...minimaxArray)

        let indicesOfMaxEval = minimaxArray.map((item, index) => {
            if (item == maxEval) {
                return index;
            }
        }).filter(index => index != undefined)



        let i = indicesOfMaxEval[Math.floor(Math.random()*indicesOfMaxEval.length)];
       


        let bestChoice = children[i];

        bestChoice.forEach((field, index) => {
            boxes[index].innerHTML = field;
            spaces[index] = field;

        })

        currentPlayer = X_Text;



    }
    validateGame();
};



const getChildren = (gameSpaces, player) => {
    let freeSpaces = getFreeSpaces(gameSpaces)

    let array = [];
    for (let i = 0; i < freeSpaces.length; i++) {
        gameSpaces[freeSpaces[i]] = player;
        array.push(new Array(...gameSpaces));
        gameSpaces[freeSpaces[i]] = null;
    }
    return array;
}


const evaluate = (gamespaces) => {
    let rating = 0;
    winningCombos.forEach(combo => {
        let [a, b, c] = combo;
        if (gamespaces[a] && gamespaces[a] === gamespaces[b] && gamespaces[a] === gamespaces[c]) {
            rating = (gamespaces[a] === X_Text) ? -Infinity : Infinity;
        }
    });
    return rating;
}


const minimax = (currentSpaces, depth, player) => {
    let children = getChildren(currentSpaces, player);

    if (depth === 0 || !checkGame(currentSpaces)) {
        return  evaluate(currentSpaces);
    } 
        if (player === O_Text) {
            let maxEval = -Infinity;
            children.forEach(child => {
                let evaluation = minimax(child, depth - 1, X_Text)
                maxEval = Math.max(maxEval, evaluation);
            })
            return maxEval

        } else if (player === X_Text) {
            let minEval = Infinity;

            children.forEach(child => {
                let evaluation = minimax(child, depth - 1, O_Text)
                minEval = Math.min(minEval, evaluation);
            })
            return minEval;

        }
}





const validateGame = () => {
    let gameContinues = true;

    winningCombos.some(combo => {
        let [a, b, c] = combo;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            showWinningCombo(combo);
            spaces[a] === X_Text ? playerScore++ : computerScore++;
            setTimeout(() => {
                window.alert(`${spaces[a]} wins!`)
                restartGame();
            }, 100)
            gameContinues = false;
            return true
        } else if (!spaces.includes(null)) {
            setTimeout(() => {
                window.alert(`Tie`)
                restartGame();
            }, 100)
            gameContinues = false;
            return true
        }
        return false
    })

    return gameContinues;
};





const indexOfMax = (array) => {
    let max = Math.max(...array);
    let maxIndex = array.indexOf(max);
    return maxIndex;

}