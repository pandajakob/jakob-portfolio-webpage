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
            // let winner = spaces[a] === X_Text ? rating = -1 : rating = 1;
            game = false;
            return true
        } else if (getFreeSpaces(gamespaces).length === 0) {
            game = false;
            return true
        }
        return false
    })
    return game;
}

const playComputerTurn = () => {
    if (checkGame(spaces)) {
        let freeSpaces = getFreeSpaces(spaces);



        let children = getChildren(spaces, O_Text);
        console.log("children", getChildren(spaces, currentPlayer))
        let minimaxArray = []

        children.forEach(child => {
            console.log("child", child)
            minimaxArray.push(minimax(child, 6, X_Text));
        })
        let i = minimaxArray.indexOf(Math.max(...minimaxArray));
        console.log("i", i)
        let bestChoice = children[i];
        
        console.log("best choice", bestChoice)

        console.log("minimaxarray", minimaxArray)

        /*
        if (i) {
            boxes[i].innerHTML = O_Text;
            spaces[i] = O_Text;
            currentPlayer = X_Text;
        } 
            */

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
    // console.log("Children", array)
    return array;

}


const evaluate = (gamespaces) => {
    let rating = 0;
    winningCombos.forEach(combo => {
        let [a, b, c] = combo;
        if (gamespaces[a] && gamespaces[a] === gamespaces[b] && gamespaces[a] === gamespaces[c]) {
            gamespaces[a] == X_Text ? rating = -Infinity : rating = Infinity;
        } else if (!spaces.includes(null)) {
            rating = 0
        }
    })
    return rating;
}

const minimax = (currentSpaces, depth, player) => {
    // console.log("depth", depth)
    let children = getChildren(currentSpaces, player);

    if (depth === 0 || !checkGame(currentSpaces)) {
        let evaluation = evaluate(currentSpaces);
        console.log("eval player", evaluation, player)
        return evaluation;
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