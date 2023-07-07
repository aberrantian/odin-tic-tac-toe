'use strict';

const GAME_BOARD = (() => {
    let movesLeft = 9;

    function getMovesLeft() {
        return movesLeft;
    }

    function decrementMoves() {
        movesLeft--;
    }

    let array = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ]

    function print() {
        const output = `\
${array[0]} | ${array[1]} | ${array[2]}
---------
${array[3]} | ${array[4]} | ${array[5]}
---------
${array[6]} | ${array[7]} | ${array[8]}`;

        console.log(output)
    }

    function isInRange(x) {
        let xIsInRange = x >= 0 && x <= 8;

        if (xIsInRange == false) {
            throw new Error(`X is out of range: ${x}`);
        } else {
            return true;
        }
    }
        
    function set(x, playerID) {
        isInRange(x);
        let isLegal = array[x] == ' ';
        
        if (isLegal == false) {
            throw new Error(`Input is illegal`);
        }

        array[x] = playerID;
    }

    function clear() {
        array = [
            ' ', ' ', ' ',
            ' ', ' ', ' ',
            ' ', ' ', ' '
        ];

        movesLeft = 9;
    }

    function get(x) {
        if (x) {
            isInRange(x);
            return array[x];
        } else {
            return array;
        }
    }

    return Object.freeze({ set, print, clear, get, getMovesLeft, decrementMoves });
})();


const createPlayer = (name, id, wins = 0) => {
      return { name, id, wins};
}


const player = (() => {
    const one = createPlayer('One', 'X', 0);
    const two = createPlayer('Two', 'O', 0);
    let turn = one;

    const get = Object.freeze({
        one: () => { return one },
        two: () => { return two },
        turn: () => { return turn },
        wins: (player) => { return player.wins }
    })

    function switchTurns() {
        turn == one ? turn = two : turn = one
    }

    function winsAdd(player) {
        player.wins++;
    }

    function winsClear(player) {
        player.wins = 0;
    }

    return { get, switchTurns, winsAdd, winsClear };
})();


function isWon() {
    const array = GAME_BOARD.get()
    let winners = [];
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
        // console.log(`checking pattern ${winningPatterns[pattern]}`);
        
        if (array[winningPatterns[pattern][0] - 1] != ' ') {
            const marker = array[winningPatterns[pattern][0] - 1];
            const second = array[winningPatterns[pattern][1] - 1];
            const third = array[winningPatterns[pattern][2] - 1];
            
            if (second === marker && third === marker) {
                console.log(`${marker} has won`);
                GAME_BOARD.clear();
                break;
            }
        }
    }

}

function play(input) {
    if (GAME_BOARD.getMovesLeft() > 0) {
        GAME_BOARD.set(input - 1, player.get.turn().id);
        GAME_BOARD.decrementMoves();
        player.switchTurns();
        console.log(`Player ${player.get.turn().name}'s turn:`);
        GAME_BOARD.print();
        isWon();
    } else {
        console.log("It's a tie");
    }
}

console.log(`Player ${player.get.turn().name}'s turn: Use 'play(<1-9>)' to play`);
GAME_BOARD.print();
