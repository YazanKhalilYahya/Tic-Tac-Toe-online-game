const cells = document.querySelectorAll(".cell");
const cell = document.querySelector(".cell");
const winning_msg = document.querySelector(".winning-msg-text");
const restart_btn = document.querySelector(".restart-btn");
const player_x = document.querySelector(".player-x");
const player_o = document.querySelector(".player-o");
const end_game_section = document.querySelector(".end-game-section");
const end_game_btn = document.querySelector(".end-game-btn");
const start_game_btn = document.querySelector(".start-game-btn");
const last_msg = document.querySelector(".last-msg");
const intro = document.querySelector(".intro");
const input1 = document.querySelector(".input1");
const input2 = document.querySelector(".input2");
const alert = document.querySelector(".alert");
const submit_btn = document.querySelector(".submit-btn");
let x;
let o;
let current_player = "X";
let count_x = 0;
let count_o = 0;
let start_game = false;
const winning_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];

function getNames() {
  x = input1.value.toUpperCase();
  o = input2.value.toUpperCase();
  player_x.innerHTML = `Player ${x}: ${count_x}`;
  player_o.innerHTML = `Player ${o}: ${count_o}`;
}

const updateScore = () => {
  if (current_player === "X") {
    count_x += 1;
  } else {
    count_o += 1;
  }
  getNames();
};

submit_btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input1.value && input2.value) {
    intro.style.visibility = "hidden";
    getNames();
    winning_msg.innerHTML = `${current_player}'s turn`;
    alert.style.visibility = "hidden";
  } else {
    alert.style.visibility = "visible";
  }
});

const cellClicked = (e) => {
  start_game = true;
  const index = e.target.dataset.id;

  if (options[index] !== "" || checkWinner()) {
    return;
  }
  options[index] = current_player;
  e.target.textContent = current_player;
  if (checkWinner()) {
    winning_msg.innerHTML = `Player ${current_player} won!`;
    updateScore();
    start_game = false;
  } else if (options.every((option) => option !== "")) {
    winning_msg.innerHTML = "It's a draw!";
    cells.forEach((cell) => {
      cell.style.color = "red";
    });
    start_game = false;
  } else {
    current_player = current_player == "X" ? "O" : "X";
    winning_msg.innerHTML = `${current_player}'s turn`;
  }
};

const checkWinner = () => {
  return winning_conditions.some((condition) => {
    const [a, b, c] = condition;
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      cells[a].style.color = "darkgreen";
      cells[b].style.color = "darkgreen";
      cells[c].style.color = "darkgreen";

      return true;
    }
    return false;
  });
};

end_game_btn.addEventListener("click", () => {
  end_game_section.style.visibility = "visible";
  if (count_x > count_o) {
    last_msg.innerHTML = `Player ${x} won!`;
  } else if (count_o > count_x) {
    last_msg.innerHTML = `Player ${o} won!`;
  } else {
    last_msg.innerHTML = "No winner!!!";
  }
});

start_game_btn.addEventListener("click", () => {
  intro.style.visibility = "visible";
  input1.value = "";
  input2.value = "";
  restartGame();
  count_o = 0;
  count_x = 0;

  end_game_section.style.visibility = "hidden";
});

cells.forEach((cell) => cell.addEventListener("click", cellClicked));

const restartGame = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.color = "#d4ac0d";
  });
  current_player = "X";
  winning_msg.innerHTML = `${current_player}'s turn.`;
  options.fill("");
  start_game = true;
};
restart_btn.addEventListener("click", restartGame);
