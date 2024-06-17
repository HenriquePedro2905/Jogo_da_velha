const player01 = "x";
const player02 = "O";
let currentPlayer = player01;
let board = ["", "", "", "", "", "", "", "", "",];
let gameOn = false;
const cell = document.getElementsByClassName('cell');
const msg = document.getElementById("mesage");
let point01 = 0;
let point02 = 0;
let namePlayer1;
let namePlayer2;
let iaTeste = false;

const iA = [1, 2, 3, 4, 5, 6, 7, 8, 9,];


const winningCombinations = [
    [0, 1, 2], [6, 7, 8], [3, 4, 5], // LINHAS
    [2, 5, 8], [0, 3, 6], [1, 4, 7], // COLUNAS
    [0, 4, 8], [2, 4, 6], // DIAGONAIS
];

function toStart() {

    namePlayer1 = document.getElementById("player1").value
    namePlayer2 = document.getElementById("player2").value

    if (namePlayer1 !== "") {
        gameOn = true;
        msg.innerText = "o jogo começou";
    } else {
        alert('prencha o nome dos jogares');
    }
}

function changePlayer() {

    currentPlayer = currentPlayer === player01 ? player02 : player01
    console.log("teste")
}

function handleClick(index) {
    if (gameOn === false)
        return;

    if (board[index] !== "")
        return;

    board[index] = currentPlayer;


    cell[index].innerHTML = currentPlayer;
    console.log(board);

    checkWinnwer();
    aiMove();
    if (iaTeste) {
        changePlayer();
    }
}

function checkWinnwer() {


    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        if ((board[a] !== "") &&
            (board[a] === board[b]) &&
            (board[b] === board[c])) {
            gameOn = false;

            if (currentPlayer === "x") {
                msg.innerText = "O jogador " + namePlayer1 + " ganhou";
                point01++;
            } else {
                msg.innerText = "O jogador " + namePlayer2 + " ganhou";
                point02++;
            }

            return;
        }
    }

    if (!board.includes("")) {
        gameOn = false;
        msg.innerText = "Deu velha!!";
    }

}

function reload() {

    const score = document.getElementById('score');


    for (const cellElement of cell) {
        cellElement.textContent = "";
    }

    board = ["", "", "", "", "", "", "", "", "",];
    gameOn = true;
    score.innerHTML = namePlayer1 + " = " + point01 + " | " + namePlayer2 + " = " + point02;
    msg.innerText = "";
}

function aiMove() {
    if (namePlayer2 === "") {
        let qualquer;
        for (i = 0; i < 9; i++) {
            if (board[i] === "") {
                qualquer = i;
                board[i] = player02;
                cell[qualquer].innerHTML = player02;
                console.log(qualquer);
                break;
            }
        }       
    } else {
        iaTeste = true;
    }
}
