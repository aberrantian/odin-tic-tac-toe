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
  const GRID_ARRAY = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    function get() {
      return array;
    }

    function set(index, value) {
      if (array[index] === " ") {
        array[index] = value;
      } else {
        console.warn(`Cell ${index} is already filled with ${array[index]}`);
      }
    }

    function reset() {
      array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    return { get, set, reset };
  })();
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
