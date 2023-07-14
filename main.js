'use strict';

const GAMEBOARD = (() => {
    const CELLS = (() => {
        let spare = 9;
        function count() { return spare; };
        function dec() { spare--; };
        function reset() { spare = 9; };

        return { count, dec, reset };
    })();


    const GRID = (() => {
        let array = [
            ' ', ' ', ' ',
            ' ', ' ', ' ',
            ' ', ' ', ' '
        ];

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
                throw new Error('Index is required but has not been given');
            } else if (marker === undefined) {
                throw new Error('Marker is required but has not been given');
            } else if (array[index] != ' ') {
                throw new Error('Illegal move, cell is not empty');
            }

            array[index] = marker;
        }

        function reset() {
            array = [
                ' ', ' ', ' ',
                ' ', ' ', ' ',
                ' ', ' ', ' '
            ];
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
    
    const CELL_ELEMENTS = document.getElementsByClassName('cell');

    function reset() {
        CELLS.reset();
        GRID.reset();
        for (let index = 0; index < CELL_ELEMENTS.length; index++) {
            CELL_ELEMENTS[index].innerText = '';
        }
    }

    return { CELLS, GRID, CELL_ELEMENTS, reset };
})(); // GAMEBOARD


const GAME = (() => {
    const PLAYER = (() => {
        const createPlayer = (marker) => {
            const WINS = {
                count: 0,
                add: () => { WINS.count++; },
                reset: () => { WINS.count = 0; }
            }
            
            return { marker, WINS };
        }
    
        const X = createPlayer('X');
        const O = createPlayer('O');
    
        const TURN = (() => {
            let current = X;
            function get() { return current };
            function toggle() { current == X ? current = O : current = X };
    
            return { get, toggle };
        })();
    
        return { X, O, TURN };
    })();
    
    
    function checkState() {
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
        ]
    
        for (let pattern = 0; pattern < WINNING_PATTERNS.length; pattern++) {
            if (ARRAY[WINNING_PATTERNS[pattern][0] - 1] != ' ') {
                const MARKER = ARRAY[WINNING_PATTERNS[pattern][0] - 1];
                const SECOND = ARRAY[WINNING_PATTERNS[pattern][1] - 1];
                const THIRD = ARRAY[WINNING_PATTERNS[pattern][2] - 1];
                
                if (SECOND === MARKER && THIRD === MARKER) {
                    return [ true, MARKER == 'X' ? 'X' : 'O' ];
                }
            }
        }
    
        return [-1]; // continue game
    }

    function getMarker() {
        return PLAYER.TURN.get().marker;
    }

    function updateTurnIndicator() {
            gameplayElements.turnIndicator.innerText = getMarker();
    }

    function play(input, event) {
        GAMEBOARD.GRID.set(input, getMarker());
        GAMEBOARD.CELLS.dec();
        event.target.innerText = getMarker();
        PLAYER.TURN.toggle();
        updateTurnIndicator();
    }

    const gameplayElements = {
        turnIndicator: document.getElementById('turn-indicator'),
        cells: GAMEBOARD.CELL_ELEMENTS,
        xWins: document.getElementById('x-wins'),
        oWins: document.getElementById('o-wins')
    };

    for (let index = 0; index < gameplayElements.cells.length; index++) {
        gameplayElements.cells[index].addEventListener('click', (event) => {
            play(index, event);

            if (checkState() == 0) {
                // tie
                GAMEBOARD.reset();
            } else if (checkState()[0] == true) {
                console.log(`${checkState()[1]} is the winner`);

                GAMEBOARD.reset();
            }
        })
    }
})();


document.getElementById('local-pvp').addEventListener('click', () => {
    document.getElementById('main-menu').hidden = true;
    document.getElementById('game-board').hidden = false;
});

document.getElementById('local-pvp').click();

document.getElementById('main-menu-btn').addEventListener('click', () => {
    document.getElementById('game-board').hidden = true;
    document.getElementById('main-menu').hidden = false;
});

/*
    TODO
    Main Task - rewrite gameplay functions for GUI use
    
    create dumb ai that makes random legal moves
    create mode tracker: human vs human or human vs computer
*/
