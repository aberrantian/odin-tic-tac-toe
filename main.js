"use strict";

const MAIN = (() => {
  const CELL_ELEMENTS = document.getElementsByClassName("cell");

  const GAME_MODE = (() => {
    let mode = "pvp";

    function get() {
      return mode;
    }

    function toggle() {
      mode === "pvp" ? (mode = "pvc") : (mode = "pvp");
    }

    return { get, toggle };
  })(); // GAME_MODE

  const GAME_OVER = (() => {
    let game_over = false;

    function toggle() {
      game_over === false ? (game_over = true) : (game_over = false);
    }

    function get() {
      return game_over;
    }

    return { get, toggle };
  })(); // GAME_OVER

  const INIT = (() => {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].addEventListener("click", () => {
        play(index);
        draw();
      });
    }

    document.getElementById("local-pvp").addEventListener("click", () => {
      if (GAME_MODE.get() != "pvp") {
        GAME_MODE.toggle();
      }

      document.getElementById("main-menu").hidden = true;
      document.getElementById("game-board").hidden = false;
    });

    document.getElementById("local-pvc").addEventListener("click", () => {
      if (GAME_MODE.get() != "pvc") {
        GAME_MODE.toggle();
      }

      document.getElementById("main-menu").hidden = true;
      document.getElementById("game-board").hidden = false;
    });

    document.getElementById("main-menu-btn").addEventListener("click", () => {
      document.getElementById("game-board").hidden = true;
      reset();
      document.getElementById("main-menu").hidden = false;
    });

    document.getElementById("restart-btn").addEventListener("click", () => {
      reset();
      document.getElementById("game-over-screen").hidden = true;
    });
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

      if (GAME_OVER.get() === false && GAME_MODE.get() === "pvc") {
        COMPUTER.play();
      }
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

    const WIN = DIAGONAL_WIN || ROW_WIN || COLUMN_WIN;

    const TIE = (() => {
      let empty_cells = 9;
      const ARRAY = GRID_ARRAY.get();
      for (let index = 0; index < ARRAY.length; index++) {
        if (ARRAY[index] != "") {
          empty_cells--;
        }
      }

      if (
        empty_cells === 0 &&
        DIAGONAL_WIN === false &&
        ROW_WIN === false &&
        COLUMN_WIN === false
      ) {
        gameOver("It's a tie!");
      }
    })(); // TIE

    if (WIN) {
      gameOver(`The winner is\n${MARKER}`);
    }
  } // evaluate()

  function gameOver(TEXT) {
    if (GAME_OVER.get() === false) {
      GAME_OVER.toggle();
    }

    document.getElementById("game-over-text").innerText = TEXT;
    document.getElementById("game-over-screen").hidden = false;
  }

  function draw() {
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].innerText = GRID_ARRAY.get()[index];
    }

    document.getElementById("turn-indicator").innerText = TURN.get();
  } // draw()

  function reset() {
    if (GAME_OVER.get() === true) {
      GAME_OVER.toggle();
    }

    GRID_ARRAY.reset();
    draw();
  }

  const COMPUTER = (() => {
    let real_board;

    function updateBoard() {
      real_board = GRID_ARRAY.get();
    }

    let human_marker;

    let computer_marker;

    function updateMarkers(human, computer) {
      human_marker = human.toUpperCase();
      computer_marker = computer.toUpperCase();
    }

    const FAKE_TURN = (() => {
      let turn;

      function set(marker) {
        turn = marker.toUpperCase();
      }

      function get() {
        return turn;
      }

      function toggle() {
        turn === "X" ? (turn = "O") : (turn = "X");
      }

      return { get, toggle, set };
    })(); // TURN

    function result(state, action) {}

    function actions(state) {}

    function player(state) {}

    function value(state) {}

    function terminal(state) {}

    function minimax(state) {
      if (terminal(state) === true) {
        return value(state);
      }

      if (player(state) === "max") {
        value = -Infinity;

        actions(state).forEach((action) => {
          value = Max(value, minimax(result(state, action)));
        });

        return value;
      } else {
        value = Infinity;

        actions(state).forEach((action) => {
          value = Min(value, minimax(result(state, action)));
        });

        return value;
      }
    }

    const LEGAL_MOVES = (() => {
      let legal_indexes = [];

      function update() {
        legal_indexes = [];

        let array = GRID_ARRAY.get();
        for (let index = 0; index < array.length; index++) {
          if (array[index] === "") {
            legal_indexes.push(index);
          }
        }
      }

      function get() {
        return legal_indexes;
      }

      return { update, get };
    })(); // LEGAL_MOVES

    function play() {
      LEGAL_MOVES.update();
      const MOVE = LEGAL_MOVES.get()[0];
      GRID_ARRAY.set(MOVE);
      evaluate(MOVE);
      TURN.toggle();
    }

    return { play };
  })(); // COMPUTER
})(); // MAIN

/*
TODO

add minimax bot with alpha beta pruning
create theme
*/
