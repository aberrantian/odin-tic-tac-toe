"use strict";

const GAMEBOARD = (() => {
  const CELLS = (() => {
    let spare = 9;
    function count() {
      return spare;
    }
    function dec() {
      spare--;
    }
    function reset() {
      spare = 9;
    }

    return { count, dec, reset };
  })();

  const GRID = (() => {
    let array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    function isInRange(x) {
      let xIsInRange = x >= 0 && x <= 8;

      if (xIsInRange == false) {
        throw new Error(`X is out of range: ${x}`);
      } else {
        return true;
      }
    }

    function get(index) {
      if (index != undefined && isInRange(index)) {
        return array[index];
      } else {
        return array;
      }
    }

    function set(index, marker) {
      if (index === undefined) {
        throw new Error("Index is required but has not been given");
      } else if (marker === undefined) {
        throw new Error("Marker is required but has not been given");
      } else if (array[index] != " ") {
        throw new Error("Illegal move, cell is not empty");
      }

      array[index] = marker;
    }

    function reset() {
      array = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    }

    function print() {
      const OUTPUT = `\
${array[0]} | ${array[1]} | ${array[2]}
---------
${array[3]} | ${array[4]} | ${array[5]}
---------
${array[6]} | ${array[7]} | ${array[8]}
`;

      console.log(OUTPUT);
    }

    return { get, set, reset, print };
  })(); // GRID

  const CELL_ELEMENTS = document.getElementsByClassName("cell");

  function reset() {
    CELLS.reset();
    GRID.reset();
    for (let index = 0; index < CELL_ELEMENTS.length; index++) {
      CELL_ELEMENTS[index].innerText = "";
    }
  }

  return { CELLS, GRID, CELL_ELEMENTS, reset };
})(); // GAMEBOARD

const GAME = (() => {
  const MODE = (() => {
    let mode;
    function get() {
      return mode;
    }
    const SET = (() => {
      function PvP() {
        mode = "PvP";
      }
      function PvC() {
        mode = "PvC";
      }

      return { PvC, PvP };
    })();

    return { get, SET };
  })();

  const COMPUTER = (() => {
    let legalCells = [];
    function resetLegalCells() {
      legalCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    resetLegalCells();

    function banCell(cell) {
      const index = legalCells.indexOf(cell);
      if (index > -1) {
        legalCells.splice(index, 1);
      }
    }

    function playRandom() {
      const legalCellsIndex = Math.floor(Math.random() * legalCells.length);
      const MOVE = legalCells[legalCellsIndex];

      if (GAMEBOARD.CELLS.count() > 0) {
        play(MOVE);
      }
    }

    function playSmart() {
      // minimax algorithm
    }

    const PLAY = {
      random: playRandom,
    };

    return { resetLegalCells, banCell, PLAY };
  })();

  function reset() {
    GAMEBOARD.reset();
    PLAYER.X.WINS.reset();
    PLAYER.O.WINS.reset();
    COMPUTER.resetLegalCells();
    gameplayElements.xWins.innerText = PLAYER.X.WINS.count();
    gameplayElements.oWins.innerText = PLAYER.O.WINS.count();
  }

  const PLAYER = (() => {
    const createPlayer = (marker) => {
      const WINS = {
        counter: 0,
        count: () => {
          return WINS.counter;
        },
        add: () => {
          WINS.counter++;
        },
        reset: () => {
          WINS.counter = 0;
        },
      };

      return { marker, WINS };
    };

    const X = createPlayer("X");
    const O = createPlayer("O");

    const TURN = (() => {
      let current = X;
      function get() {
        return current;
      }
      function toggle() {
        current == X ? (current = O) : (current = X);
      }

      return { get, toggle };
    })();

    return { X, O, TURN };
  })();

  function showWinningPattern(patternIndex) {
    const CELLS = GAMEBOARD.CELL_ELEMENTS;
    function addClass(index1, index2, index3) {
      CELLS[index1].classList.add("win-cell");
      CELLS[index2].classList.add("win-cell");
      CELLS[index3].classList.add("win-cell");
    }

    switch (patternIndex) {
      case 0:
        addClass(0, 1, 2);
        break;
      case 1:
        addClass(0, 3, 6);
        break;
      case 2:
        addClass(0, 4, 8);
        break;
      case 3:
        addClass(1, 4, 7);
        break;
      case 4:
        addClass(2, 4, 6);
        break;
      case 5:
        addClass(2, 5, 8);
        break;
      case 6:
        addClass(3, 4, 5);
        break;
      case 7:
        addClass(6, 7, 8);
        break;
    }
  }

  function clearWinningPattern() {
    const CELLS = document.getElementsByClassName("win-cell");

    for (let index = 0; index < CELLS.length; index++) {
      CELLS[index].classList.remove("win-cell");
    }
  }

  function checkState() {
    console.log("Checking State");
    if (GAMEBOARD.CELLS.count() <= 0) {
      return [0]; // tie
    }

    const ARRAY = GAMEBOARD.GRID.get();
    const WINNING_PATTERNS = [
      [1, 2, 3], // top left to top right
      [1, 4, 7], // top left to bottom left
      [1, 5, 9], // top left to bottom right
      [2, 5, 8], // middle top to middle bottom
      [3, 5, 7], // top right to bottom left
      [3, 6, 9], // top right to bottom right
      [4, 5, 6], // middle left to middle right
      [7, 8, 9], // bottom left to bottom right
    ];

    for (let pattern = 0; pattern < WINNING_PATTERNS.length; pattern++) {
      if (ARRAY[WINNING_PATTERNS[pattern][0] - 1] != " ") {
        const MARKER = ARRAY[WINNING_PATTERNS[pattern][0] - 1];
        const SECOND = ARRAY[WINNING_PATTERNS[pattern][1] - 1];
        const THIRD = ARRAY[WINNING_PATTERNS[pattern][2] - 1];

        if (SECOND === MARKER && THIRD === MARKER) {
          showWinningPattern(pattern);
          return [true, MARKER == "X" ? "X" : "O"];
        }
      }
    }

    return [-1]; // continue game
  }

  function updateGame() {
    console.log("Updating Game");
    if (checkState() == 0) {
      // tie
      setTimeout(() => {
        clearWinningPattern();
        GAMEBOARD.reset();
        COMPUTER.resetLegalCells();
      }, 1000);
    } else if (checkState()[0] == true) {
      console.log(`${checkState()[1]} is the winner`);

      if (checkState()[1] == "X") {
        console.log("adding point for X");
        PLAYER.X.WINS.add();
        gameplayElements.xWins.innerText = PLAYER.X.WINS.count();
      } else {
        console.log("adding point for O");
        PLAYER.O.WINS.add();
        gameplayElements.oWins.innerText = PLAYER.O.WINS.count();
      }

      setTimeout(() => {
        clearWinningPattern();
        GAMEBOARD.reset();
        COMPUTER.resetLegalCells();
      }, 1000);
    }
  }

  function getMarker() {
    return PLAYER.TURN.get().marker;
  }

  function updateTurnIndicator() {
    gameplayElements.turnIndicator.innerText = getMarker();
  }

  function play(input) {
    GAMEBOARD.GRID.set(input, getMarker());
    GAMEBOARD.CELLS.dec();
    GAME.COMPUTER.banCell(input);
    GAMEBOARD.CELL_ELEMENTS[input].innerText = getMarker();
    PLAYER.TURN.toggle();
    updateTurnIndicator();
    updateGame();
  }

  const gameplayElements = {
    turnIndicator: document.getElementById("turn-indicator"),
    cells: GAMEBOARD.CELL_ELEMENTS,
    xWins: document.getElementById("x-wins"),
    oWins: document.getElementById("o-wins"),
  };

  for (let index = 0; index < gameplayElements.cells.length; index++) {
    gameplayElements.cells[index].addEventListener("click", () => {
      play(index);

      if (GAME.MODE.get() === "PvC") {
        GAME.COMPUTER.PLAY.random();
      }
    });
  }

  return { reset, MODE, COMPUTER };
})();

document.getElementById("local-pvp").addEventListener("click", () => {
  GAME.MODE.SET.PvP();
  document.getElementById("main-menu").hidden = true;
  document.getElementById("game-board").hidden = false;
});

document.getElementById("local-pvc").addEventListener("click", () => {
  GAME.MODE.SET.PvC();
  document.getElementById("main-menu").hidden = true;
  document.getElementById("game-board").hidden = false;
});

document.getElementById("main-menu-btn").addEventListener("click", () => {
  document.getElementById("game-board").hidden = true;
  document.getElementById("main-menu").hidden = false;
  GAME.reset();
});

/*
    TODO
    Main Task - create smart bot

    BUGS
        - player wins increment in twos
        - win cells don't fully clear after new round
*/
