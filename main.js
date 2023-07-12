'use strict';

const GAME_BOARD = (() => {
    const cells = (() => {
        let spare = 9;
        function get() { return spare; };
        function dec() { spare--; };
        function reset() { spare = 9; };

        return { get, dec, reset };
    })();


    const grid = (() => {
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
            const output = `\
${array[0]} | ${array[1]} | ${array[2]}
---------
${array[3]} | ${array[4]} | ${array[5]}
---------
${array[6]} | ${array[7]} | ${array[8]}
`;

            console.log(output);
        }

        return { get, set, reset, print };
    })(); // grid
    
    function reset() {
        cells.reset();
        grid.reset();
    }

    return { cells, grid, reset };
})(); // GAME_BOARD


const player = (() => {
    const createPlayer = (marker) => {
        const wins = {
            count: 0,
            add: () => { wins.count++; },
            reset: () => { wins.count = 0; }
        }
        
        return { marker, wins };
    }

    const X = createPlayer('X');
    const O = createPlayer('O');

    const turn = (() => {
        let current = X;
        function get() { return current };
        function toggle() { current == X ? current = O : current = X };

        return { get, toggle };
    })();

    return { X, O, turn };
})();


function isWon() {
    const array = GAME_BOARD.grid.get();
    const winningPatterns = [
        [1, 2, 3], // top left to top right
        [1, 4, 7], // top left to bottom left
        [1, 5, 9], // top left to bottom right
        [2, 5, 8], // middle top to middle bottom
        [3, 5, 7], // top right to bottom left
        [3, 6, 9], // top right to bottom right
        [4, 5, 6], // middle left to middle right
        [7, 8, 9], // bottom left to bottom right
    ]

    for (let pattern = 0; pattern < winningPatterns.length; pattern++) {
        if (array[winningPatterns[pattern][0] - 1] != ' ') {
            const marker = array[winningPatterns[pattern][0] - 1];
            const second = array[winningPatterns[pattern][1] - 1];
            const third = array[winningPatterns[pattern][2] - 1];
            
            if (second === marker && third === marker) {
                console.log(`${marker} has won`);
                GAME_BOARD.reset();
                player.turn.get().wins.add();
                player.turn.toggle();
                console.log(`NEW GAME: ${player.turn.get().marker}'s turn`);
                GAME_BOARD.grid.print();
                break;
            }
        }
    }

}

function play(input) {
    if (GAME_BOARD.cells.get() > 0) {
        GAME_BOARD.grid.set(input - 1, player.turn.get().marker);
        GAME_BOARD.cells.dec();
        player.turn.toggle();
        console.log(`Player ${player.turn.get().marker}'s turn`);
        GAME_BOARD.grid.print();
        isWon();
    } else {
        console.log("It's a tie");
        GAME_BOARD.reset();
        console.log(`NEW GAME: ${player.turn.get().marker}'s turn`);
        GAME_BOARD.grid.print();
    }
}

console.log(`Player ${player.turn.get().marker}'s turn: Use 'play(<1-9>)' to play`);
GAME_BOARD.grid.print();

document.getElementById('local-pvp').addEventListener('click', () => {
    document.getElementById('main-menu').hidden = true;
    document.getElementById('game-board').hidden = false;
});

document.getElementById('main-menu-btn').addEventListener('click', () => {
    document.getElementById('game-board').hidden = true;
    document.getElementById('main-menu').hidden = false;
});

/*
    TODO
    Main Task - allow playing current state in current ui
    
    create dumb ai that makes random legal moves
    create mode tracker: human vs human or human vs computer
    wrap gameloop into a while loop and allow for manual starting/stopping of game
*/
