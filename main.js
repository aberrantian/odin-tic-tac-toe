'use strict';

const GAME_BOARD = (() => {
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

    function get(x, y) {
        if (x && y) {
            xyInRange(x, y);
            return array[x][y];
        } else {
            return array;
        }
    }

    return Object.freeze({ set, print, clear, get });
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
        player.turn == one ? player.turn = player.two : player.turn = player.one
    }

    function winsAdd(player) {
        player.wins++;
    }

    function winsClear(player) {
        player.wins = 0;
    }

    return Object.freeze({ get, switchTurns, winsAdd, winsClear });
})();


const GAME_LOOP = (() => {
    let loop = true;

    function isTrue() {
        return loop ? true : false;
    }

    function toggle() {
        loop ? loop = false : loop = true;
    }

    return Object.freeze({ isTrue, toggle });
})();


while (GAME_LOOP.isTrue()) {
    GAME_LOOP.toggle();
    console.log('ran once');
}