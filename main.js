"use strict";

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
      evaluate(index);
      TURN.toggle();
    }
  }

  function evaluate(move) {
    const ROW = Math.floor(move / 3);
    const INDEX = move - ROW * 3;
    const ARRAY = [
      [GRID_ARRAY.get()[0], GRID_ARRAY.get()[1], GRID_ARRAY.get()[2]],
      [GRID_ARRAY.get()[3], GRID_ARRAY.get()[4], GRID_ARRAY.get()[5]],
      [GRID_ARRAY.get()[6], GRID_ARRAY.get()[7], GRID_ARRAY.get()[8]],
    ];
    const MARKER = ARRAY[ROW][INDEX];
    // check for 3 in a row
    if (
      ARRAY[ROW][0] === MARKER &&
      ARRAY[ROW][1] === MARKER &&
      ARRAY[ROW][2] === MARKER
    ) {
      console.log(`${MARKER} has won`);
    }
    // check for 3 in a column

    // check for diagonal

    // check for tie
  }

  function draw() {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].innerText = GRID_ARRAY.get()[index];
    }
  }
})(); // MAIN

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
