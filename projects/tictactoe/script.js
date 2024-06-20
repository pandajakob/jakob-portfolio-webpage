let image = "url(resources/X.png)";
const turnEnum = Object.freeze({
    X: "url(resources/X.png)",
    O: "url(resources/O.png)"
});
const GameField = Object.freeze({
    a1: document.getElementById("a1"),
    a2: document.getElementById("a2"),
    a3: document.getElementById("a3"),
    b1: document.getElementById("b1"),
    b2: document.getElementById("b2"),
    b3: document.getElementById("b3"),
    c1: document.getElementById("c1"),
    c2: document.getElementById("c2"),
    c3: document.getElementById("c3"),
});



let gameFields = Object.values(GameField); 

let winningCombinations = [
    [GameField.a1, GameField.a2, GameField.a3],
    [GameField.a1, GameField.b2, GameField.c3],
    [GameField.a1, GameField.b1, GameField.c1],
    [GameField.a2, GameField.b2, GameField.c2],
    [GameField.a3, GameField.b3, GameField.c3],
    [GameField.b1, GameField.b2, GameField.b3],
    [GameField.c1, GameField.c2, GameField.c3],
    [GameField.c1, GameField.b2, GameField.a3]
];

let turn = turnEnum.X;

let playerScoreElement = document.getElementById("playerScore")
let computerScoreElement = document.getElementById("computerScore")
let computerScore = 0;
let playerScore = 0;

let gameInProgress = false;


// adds eventListeners for each gameField
gameFields.forEach(field => {
    field.addEventListener("click", function(){
        if (field.style.backgroundImage.length === 0 && turn === turnEnum.X) {
            field.style.backgroundImage = turnEnum.X;
            gameInProgress = true;
            validateGame();
            if (gameInProgress) {
            turn = turnEnum.O
            updateTurnUI();
            setTimeout(computerTurn, 500);
            }
        };
    });
});

const updateTurnUI = () => {
    if (turn === turnEnum.O) {
        image = "url(resources/O.png)"
        o.style.backgroundColor = "gainsboro"
        x.style.backgroundColor = "whitesmoke"

    } else if (turn === turnEnum.X) {
        image = "url(resources/X.png)"
        x.style.backgroundColor = "lightgray"
        o.style.backgroundColor = "whitesmoke"
    }
}


const computerTurn = () => {
    let emptyFields = [];
    let emptyDefendingFields = [];
    let emptyWinningFields = [];

    let OFields = gameFields.filter((field) => field.style.backgroundImage.includes("O"));
    let XFields = gameFields.filter((field) => field.style.backgroundImage.includes("X"));

    gameFields.forEach(field => {
        if (field.style.backgroundImage.length == 0) {
            emptyFields.push(field)
        }
    })

    winningCombinations.forEach(comb => {
        if (OFields.includes(comb[0]) && OFields.includes(comb[1]) && emptyFields.includes(comb[2])) {
            emptyWinningFields.push(comb[2])
        } else if (OFields.includes(comb[1]) && OFields.includes(comb[2]) && emptyFields.includes(comb[0])) {
            emptyWinningFields.push(comb[2])
        }
        else if (OFields.includes(comb[0]) && OFields.includes(comb[2]) && emptyFields.includes(comb[1])) {
            emptyWinningFields.push(comb[2])
        } else if (XFields.includes(comb[0]) && XFields.includes(comb[1]) && emptyFields.includes(comb[2])) {
            emptyDefendingFields.push(comb[2])
        } else if (XFields.includes(comb[1]) && XFields.includes(comb[2]) && emptyFields.includes(comb[0])) {
            emptyDefendingFields.push(comb[2])
        }
        else if (XFields.includes(comb[0]) && XFields.includes(comb[2]) && emptyFields.includes(comb[1])) {
            emptyDefendingFields.push(comb[2])
        }
    }) 

    if(emptyWinningFields.length === 0) {
        const randomUnusedField = emptyFields[Math.floor(Math.random()*emptyFields.length)];
        randomUnusedField.style.backgroundImage = turnEnum.O;
    } else if (emptyDefendingFields.length !== 0) {
        emptyDefendingFields[0].style.backgroundImage = turnEnum.O;
    }
    else {
        emptyWinningFields[0].style.backgroundImage = turnEnum.O;
    }
    turn = turnEnum.X;
    updateTurnUI();
    validateGame();

};

const validateGame = () => {
    let XFields = gameFields.filter((field) => field.style.backgroundImage.includes("X"));
    let OFields = gameFields.filter((field) => field.style.backgroundImage.includes("O"));

   winningCombinations.forEach(comb => {

    if (XFields.includes(comb[0]) && XFields.includes(comb[1]) && XFields.includes(comb[2])) {
        console.log("x-win");

        setTimeout(restartGame, 500);
        playerScore++;
        gameInProgress = false;

    } else if (OFields.includes(comb[0]) && OFields.includes(comb[1]) && OFields.includes(comb[2])) {
        console.log("o-win")
        setTimeout(restartGame, 500);
        computerScore++;
        gameInProgress = false;

    } else if (XFields.length + OFields.length === 9) {
        console.log("tie")
        setTimeout(restartGame, 500);
        gameInProgress = false;

    } else {
        console.log("no winner yet")
    }
   })


};


const restartGame = () => {
    gameFields.forEach(field => { 
        field.style.backgroundImage = ""
    })
    playerScoreElement.innerHTML = playerScore;
    computerScoreElement.innerHTML = computerScore;
}
