'use strict';

const GAME_BOARD = (() => {
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
        ]
    }

    function get(x) {
        if (x) {
            isInRange(x);
            return array[x];
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