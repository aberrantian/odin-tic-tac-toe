"use strict";

/*
GAME
  GRID
    array
  MODE
    PvP
    PvC
  PLAYER
    marker
    wins
  COMPUTER
    random_ai
    minimax_ai
  evalGame()
    check for winners
      increase win counter for winner
    check for tie
*/

const MAIN = (() => {
  const CELL_ELEMENTS = document.getElementsByClassName("cell");

  const INIT = (() => {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].addEventListener("click", () => {
        play(index);
        draw();
      });
    }
  })();

  const GRID_ARRAY = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    function get(index) {
      if (index !== undefined) {
        return array[index];
      } else {
        return array;
      }
    }

    function set(index) {
      if (array[index] === " ") {
        array[index] = TURN.get();
      } else {
        console.warn(`Cell ${index} is already filled with ${array[index]}`);
      }
    }

    function reset() {
      array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    return { get, set, reset };
  })();

  const TURN = (() => {
    let turn = "X";

    function get() {
      return turn;
    }

    function toggle() {
      turn === "X" ? (turn = "O") : (turn = "X");
    }

    return { get, toggle };
  })();

  function play(index) {
    const IN_RANGE = index >= 0 && index <= 8;
    const IS_LEGAL = GRID_ARRAY.get()[index] === " ";

    if (IN_RANGE && IS_LEGAL) {
      GRID_ARRAY.set(index);
      TURN.toggle();
    }
  }

  function draw() {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].innerText = GRID_ARRAY.get()[index];
    }
  }
})();

document.getElementById("local-pvp").addEventListener("click", () => {
  document.getElementById("main-menu").hidden = true;
  document.getElementById("game-board").hidden = false;
});

document.getElementById("local-pvc").addEventListener("click", () => {
  document.getElementById("main-menu").hidden = true;
  document.getElementById("game-board").hidden = false;
});

// document.getElementById("main-menu-btn").addEventListener("click", () => {
//   document.getElementById("game-board").hidden = true;
//   document.getElementById("main-menu").hidden = false;
// });

document.getElementById("local-pvp").click();
