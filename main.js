const GAME_BOARD = (function() {
    let gameBoard = [
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined]
    ]

    return {
        gameBoard
    };
})();

const createPlayer = (name) => {
    return { name }
}
