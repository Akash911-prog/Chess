export function pawnMask(from, to) {
    let mask = 0n;
    for (let i = BigInt(from); i < to; i++) {
        mask |= (1n << i);
    }
    return mask;
};

export function initialBoard(whiteBoard, blackBoard) {
    let wholeWhite = 0n;
    let wholeBlack = 0n;
    for (const key in whiteBoard) {
        if (Object.prototype.hasOwnProperty.call(whiteBoard, key)) {
            const pieces = whiteBoard[key];
            wholeWhite |= pieces;
        }
    }
    for (const key in blackBoard) {
        if (Object.prototype.hasOwnProperty.call(blackBoard, key)) {
            const pieces = blackBoard[key];
            wholeBlack |= pieces;
        }
    }

    return { white: wholeWhite, black: wholeBlack, occupied: wholeWhite | wholeBlack };
};