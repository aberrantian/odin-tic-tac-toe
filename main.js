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

    function set(x, y, playerID) {
        xIsInRange = x >= 0 && x <= 2;
        yIsInRange = y >= 0 && y <= 2;
        isLegal = array[x][y] == ' ';

        if (xIsInRange == false) {
            throw new Error(`X is out of range: ${x}`);
        } else if (yIsInRange == false) {
            throw new Error(`Y is out of range: ${y}`);
        } else if (isLegal == false) {
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

    return { array, set, print, clear };
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
    function switchTurns() {
        player.turn == one ? player.turn = player.two : player.turn = player.one
    }

    // WARNING can currently change turn outside of this object, no bueno!
    return { one, two, turn, switchTurns };
})();

console.log(player.turn)