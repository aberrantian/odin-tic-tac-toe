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
    return { name, id, wins }
}