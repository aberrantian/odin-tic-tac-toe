const GAME_BOARD = (function() {
    let array = [
    //    0    1    2
        [' ', ' ', ' '], // 0
        [' ', ' ', ' '], // 1
        [' ', ' ', ' ']  // 2
    ]

    function set(x, y, playerID) {
        xIsInRange = x >= 0 && x <= 2;
        yIsInRange = y >= 0 && y <= 2;

        if (xIsInRange && yIsInRange) {
            console.log('X and Y are in range');
        } else {
            console.warn(`X and Y are not in range:\nX: ${x}\tY: ${y}`);
        }
    }

    return { array, set };
})();

const createPlayer = (name) => {
    return { name }
}
