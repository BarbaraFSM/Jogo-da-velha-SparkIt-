const cells = document.querySelectorAll('.cell'); // Corrigido o seletor para pegar as células corretamente
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // X será o jogador SparkIt
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => cellClicked(index)); // Corrigida a função cellClicked
    });
    restartButton.addEventListener('click', restartGame);
    statusText.textContent = `Vez do Jogador SparkIt (⚡)!`;
    running = true;
}

function cellClicked(index) {
    if (options[index] !== "" || !running) {
        return;
    }

    updateCell(index);
    checkWinner();
}

function updateCell(index) {
    options[index] = currentPlayer;
    cells[index].textContent = currentPlayer === 'X' ? '⚡' : 'O'; // SparkIt: ⚡
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Vez do Jogador ${currentPlayer === 'X' ? 'SparkIt (⚡)' : 'O'}`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (options[a] === "" || options[b] === "" || options[c] === "") {
            continue;
        }
        if (options[a] === options[b] && options[b] === options[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer === 'X' ? 'SparkIt (⚡)' : 'Jogador O'} venceu!`;
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "Empate!";
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Vez do Jogador SparkIt (⚡)!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}
