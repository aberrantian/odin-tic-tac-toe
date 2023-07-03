'use strict';
const GAME_BOARD = (function() {
    let array = [
    //    0    1    2
        [' ', ' ', ' '], // 0
        [' ', ' ', ' '], // 1
        [' ', ' ', ' ']  // 2
    ]

    function print() {
        const output = `\
${array[0][0]} | ${array[0][1]} | ${array[0][2]}
---------
${array[1][0]} | ${array[1][1]} | ${array[1][2]}
---------
${array[2][0]} | ${array[2][1]} | ${array[2][2]}`;

        console.log(output)
    }

    function xyInRange(x, y) {
        let xIsInRange = x >= 0 && x <= 2;
        let yIsInRange = y >= 0 && y <= 2;

        if (xIsInRange == false) {
            throw new Error(`X is out of range: ${x}`);
        } else if (yIsInRange == false) {
            throw new Error(`Y is out of range: ${y}`);
        } else {
            return true;
        }
    }
        
    function set(x, y, playerID) {
        xyInRange(x, y);
        let isLegal = array[x][y] == ' ';
        
        if (isLegal == false) {
            throw new Error(`Input is illegal`);
        }

        array[x][y] = playerID;
    }

    function clear() {
        array = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]
    }

    return { set, print, clear };
})();


const createPlayer = (name, id, wins) => {
    function winsAdd() {
        wins++;
    }

    function winsClear() {
        wins = 0;
    }

    return { name, id, wins, winsAdd, winsClear };
}

const player = (() => {
    const one = createPlayer('One', 'X', 0);
    const two = createPlayer('Two', 'O', 0);
    let turn = one;

    const get = Object.freeze({
        one: () => { return one },
        two: () => { return two },
        turn: () => { return two }
    })

    function switchTurns() {
        player.turn == one ? player.turn = player.two : player.turn = player.one
    }

    return Object.freeze({ get, switchTurns });
})();