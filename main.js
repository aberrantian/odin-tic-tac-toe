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
  })(); // INIT

  const GRID_ARRAY = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];

    function get(index) {
      if (index !== undefined) {
        return array[index];
      } else {
        return array;
      }
    }

    function set(index) {
      if (array[index] === "") {
        array[index] = TURN.get();
      } else {
        console.warn(`Cell ${index} is already filled with ${array[index]}`);
      }
    }

    function reset() {
      array = ["", "", "", "", "", "", "", "", ""];
    }

    return { get, set, reset };
  })(); // GRID_ARRAY

  const TURN = (() => {
    let turn = "X";

    function get() {
      return turn;
    }

    function toggle() {
      turn === "X" ? (turn = "O") : (turn = "X");
    }

    return { get, toggle };
  })(); // TURN

  function play(index) {
    const IN_RANGE = index >= 0 && index <= 8;
    const IS_LEGAL = GRID_ARRAY.get()[index] === "";

    if (IN_RANGE && IS_LEGAL) {
      GRID_ARRAY.set(index);
      evaluate(index);
      TURN.toggle();
    }
  } // play()

  function evaluate(move) {
    const ROW = Math.floor(move / 3);
    const INDEX = move - ROW * 3;
    const ARRAY = [
      [GRID_ARRAY.get()[0], GRID_ARRAY.get()[1], GRID_ARRAY.get()[2]],
      [GRID_ARRAY.get()[3], GRID_ARRAY.get()[4], GRID_ARRAY.get()[5]],
      [GRID_ARRAY.get()[6], GRID_ARRAY.get()[7], GRID_ARRAY.get()[8]],
    ];
    const MARKER = ARRAY[ROW][INDEX];

    const DIAGONAL_WIN =
      (ARRAY[0][0] === MARKER &&
        ARRAY[1][1] === MARKER &&
        ARRAY[2][2] === MARKER) ||
      (ARRAY[0][2] === MARKER &&
        ARRAY[1][1] === MARKER &&
        ARRAY[2][0] === MARKER);

    const ROW_WIN =
      ARRAY[ROW][0] === MARKER &&
      ARRAY[ROW][1] === MARKER &&
      ARRAY[ROW][2] === MARKER;

    const COLUMN_WIN =
      ARRAY[0][INDEX] === MARKER &&
      ARRAY[1][INDEX] === MARKER &&
      ARRAY[2][INDEX] === MARKER;

    console.clear();
    console.log(`DIAGONAL_WIN = ${DIAGONAL_WIN}`);
    console.log(`ROW_WIN = ${ROW_WIN}`);
    console.log(`COLUMN_WIN = ${COLUMN_WIN}`);
    // check for tie
    const TIE = (() => {
      let empty_cells = 9;
      const ARRAY = GRID_ARRAY.get();
      for (let index = 0; index < ARRAY.length; index++) {
        if (ARRAY[index] != "") {
          empty_cells--;
        }
      }

      if (
        empty_cells <= 0 &&
        DIAGONAL_WIN === false &&
        ROW_WIN === false &&
        COLUMN_WIN === false
      ) {
        return 0;
      }
    })();
  } // evaluate()

  function draw() {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].innerText = GRID_ARRAY.get()[index];
    }

    document.getElementById("turn-indicator").innerText = TURN.get();
  } // draw()
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
