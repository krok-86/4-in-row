const playerOne = document.getElementById("playerOne");
const playerTwo = document.getElementById("playerTwo");
const startGame = document.getElementById("buttonNewGame");
let player = true;
let oneOrTwo;
let winnerStr = localStorage.getItem("winner");
let winner =
  winnerStr && winnerStr !== "undefined" ? JSON.parse(winnerStr) : "";
let stringNumbers = localStorage.getItem("continueGame");
let numbers = stringNumbers ? JSON.parse(stringNumbers) : [];

function changeColorPlayer() {
  playerOne.style.backgroundColor = player ? "red" : "green";
  playerTwo.style.backgroundColor = player ? "green" : "red";
}

function start(arr) {
  player = true;
  const winBoard = document.getElementById("winBoard");
  if (winBoard) {
    winBoard.remove();
    numbers = [];
  }
  numbers = arr;
  const previousBoard = document.getElementById("board");
  if (previousBoard) {
    previousBoard.remove();
  }
  let board = document.createElement("div");
  board.classList.add("board");
  board.id = "board";
  document.body.appendChild(board);
  checkForWin();
  for (let i = 0; i < 49; i++) {
    if (!arr[i]) {
      arr[i] = 0;
    }
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.id = i;
    tile.innerText = arr[i] || 0;
    recolor(tile, tile.innerText);

    board.appendChild(tile);
  }

  changeColorPlayer();

  board.addEventListener("click", function (event) {
    if (event.target.innerText == 0) {
      oneOrTwo = player ? 1 : 2;
      localStorage.setItem("winner", oneOrTwo);
      movePlayer(+event.target.id);
      player = !player;
      changeColorPlayer();
    }
  });
}
function preStart() {
  numbers = [];
  localStorage.setItem("continueGame", JSON.stringify([]));
  start(numbers);
}
startGame.onclick = preStart;
start(numbers);

function recolor(tile, index) {
  if (index == 0) {
    tile.style.color = "rgb(219, 253, 94)";
  }
  if (index == 1) {
    tile.style.color = "red";
    tile.style.backgroundColor = "red";
  }
  if (index == 2) {
    tile.style.color = "green";
    tile.style.backgroundColor = "green";
  }
}

function movePlayer(index) {
  if (numbers[index + 42] == 0) {
    numbers[index + 42] = oneOrTwo;
    const tile = document.getElementById([index + 42]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else if (numbers[index + 35] == 0) {
    numbers[index + 35] = oneOrTwo;
    const tile = document.getElementById([index + 35]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else if (numbers[index + 28] == 0) {
    numbers[index + 28] = oneOrTwo;
    const tile = document.getElementById([index + 28]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else if (numbers[index + 21] == 0) {
    numbers[index + 21] = oneOrTwo;
    const tile = document.getElementById([index + 21]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else if (numbers[index + 14] == 0) {
    numbers[index + 14] = oneOrTwo;
    const tile = document.getElementById([index + 14]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else if (numbers[index + 7] == 0) {
    numbers[index + 7] = oneOrTwo;
    const tile = document.getElementById([index + 7]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  } else {
    numbers[index] = oneOrTwo;
    const tile = document.getElementById([index]);
    tile.innerText = oneOrTwo;
    recolor(tile, tile.innerText);
  }
  checkForWin();
  localStorage.setItem("continueGame", JSON.stringify(numbers));
}

function checkForWin() {
  let counter = 0;
  winnerStr = localStorage.getItem("winner");
  winner = winnerStr && winnerStr !== "undefined" ? JSON.parse(winnerStr) : "";
  for (let i = 48; i >= 0; i--) {
    if (numbers[i] != 0 && numbers.length) {
      if (i % 7 === 0 || (i - 1) % 7 === 0 || (i - 2) % 7 === 0) {
        if (
          (numbers[i] === numbers[i - 6] &&
            numbers[i] === numbers[i - 12] &&
            numbers[i] === numbers[i - 18]) ||
          (numbers[i] === numbers[i - 7] &&
            numbers[i] === numbers[i - 14] &&
            numbers[i] === numbers[i - 21])
        ) {
          createWinBoard(`winner is ${winner}`);
        }
      } else if ((i - 3) % 7 === 0) {
        if (
          (numbers[i] === numbers[i - 1] &&
            numbers[i] === numbers[i - 2] &&
            numbers[i] === numbers[i - 3]) ||
          (numbers[i] === numbers[i - 8] &&
            numbers[i] === numbers[i - 16] &&
            numbers[i] === numbers[i - 24]) ||
          (numbers[i] === numbers[i - 6] &&
            numbers[i] === numbers[i - 12] &&
            numbers[i] === numbers[i - 18]) ||
          (numbers[i] === numbers[i - 7] &&
            numbers[i] === numbers[i - 14] &&
            numbers[i] === numbers[i - 21])
        ) {
          createWinBoard(`winner is ${winner}`);
        }
      } else {
        if (
          (numbers[i] === numbers[i - 1] &&
            numbers[i] === numbers[i - 2] &&
            numbers[i] === numbers[i - 3]) ||
          (numbers[i] === numbers[i - 8] &&
            numbers[i] === numbers[i - 16] &&
            numbers[i] === numbers[i - 24]) ||
          (numbers[i] === numbers[i - 7] &&
            numbers[i] === numbers[i - 14] &&
            numbers[i] === numbers[i - 21])
        ) {
          createWinBoard(`winner is ${winner}`);
        }
      }
    } else {
      counter++;
    }
  }if (counter === 0) {
      createWinBoard('draw');
    }
  
}

function createWinBoard(a) {
  let winBoard = document.createElement("div");
  winBoard.id = "winBoard";
    winBoard.innerText = a;

  document.body.appendChild(winBoard);
  winBoard.classList.add("winStyle");
  board.removeEventListener("click", function (event) {
    if (event.target.innerText == 0) {
      oneOrTwo = player ? 1 : 2;
      movePlayer(+event.target.id);
      player = !player;
      changeColorPlayer();
    }
  });
}
