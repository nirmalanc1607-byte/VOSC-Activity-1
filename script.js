const cells = document.querySelectorAll(".cell");

const status = document.getElementById("status");

const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");

const resultMessage = document.getElementById("resultMessage");
const playAgainButton = document.getElementById("playAgainButton");


let currentPlayer = "X";

let gameActive = true;

let scoreX = 0;
let scoreO = 0;


const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


cells.forEach(function(cell) {

    cell.addEventListener("click", function() {

        if (cell.textContent !== "" || gameActive === false) {
            return;
        }

        cell.textContent = currentPlayer;


        /* Only visual change */

        if (currentPlayer === "X") {

            cell.classList.add("x");

        } else {

            cell.classList.add("o");

        }


        checkWinner();

    });

});


function checkWinner() {

    for (let combination of winningCombinations) {

        let a = combination[0];
        let b = combination[1];
        let c = combination[2];


        if (
            cells[a].textContent !== "" &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");


            gameActive = false;


            if (currentPlayer === "X") {

                scoreX++;

                scoreXDisplay.textContent = scoreX;

            } else {

                scoreO++;

                scoreODisplay.textContent = scoreO;

            }


            status.textContent = "";

            resultMessage.textContent =
                "PLAYER " + currentPlayer + " WINS!";

            playAgainButton.textContent = "PLAY AGAIN";

            playAgainButton.style.display = "inline-block";


            return;
        }

    }


    checkDraw();

}


function checkDraw() {

    let boardFull = true;


    cells.forEach(function(cell) {

        if (cell.textContent === "") {

            boardFull = false;

        }

    });


    if (boardFull === true) {

        gameActive = false;

        status.textContent = "";

        resultMessage.textContent = "IT'S A DRAW!";

        playAgainButton.textContent = "TRY AGAIN";

        playAgainButton.style.display = "inline-block";

        return;
    }


    changePlayer();

}


function changePlayer() {

    if (currentPlayer === "X") {

        currentPlayer = "O";

    } else {

        currentPlayer = "X";

    }


    status.textContent =
        "Player " + currentPlayer + "'s Turn";

}


function resetGame() {

    cells.forEach(function(cell) {

        cell.textContent = "";

        cell.classList.remove("x");

        cell.classList.remove("o");

        cell.classList.remove("winner");

    });


    currentPlayer = "X";

    gameActive = true;


    status.textContent = "Player X's Turn";


    resultMessage.textContent = "";

    playAgainButton.style.display = "none";

}


playAgainButton.addEventListener("click", resetGame);