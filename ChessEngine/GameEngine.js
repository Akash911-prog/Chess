import { pawnMask, initialBoard } from "./utils/masks.js";

class GameEngine {
    constructor() {

        //indexes corresponding to each position
        this.indexes = {
            a1: 0n, b1: 1n, c1: 2n, d1: 3n, e1: 4n, f1: 5n, g1: 6n, h1: 7n,
            a2: 8n, b2: 9n, c2: 10n, d2: 11n, e2: 12n, f2: 13n, g2: 14n, h2: 15n,
            a3: 16n, b3: 17n, c3: 18n, d3: 19n, e3: 20n, f3: 21n, g3: 22n, h3: 23n,
            a4: 24n, b4: 25n, c4: 26n, d4: 27n, e4: 28n, f4: 29n, g4: 30n, h4: 31n,
            a5: 32n, b5: 33n, c5: 34n, d5: 35n, e5: 36n, f5: 37n, g5: 38n, h5: 39n,
            a6: 40n, b6: 41n, c6: 42n, d6: 43n, e6: 44n, f6: 45n, g6: 46n, h6: 47n,
            a7: 48n, b7: 49n, c7: 50n, d7: 51n, e7: 52n, f7: 53n, g7: 54n, h7: 55n,
            a8: 56n, b8: 57n, c8: 58n, d8: 59n, e8: 60n, f8: 61n, g8: 62n, h8: 63n,
        };

        //white pieces bitboard
        this.white = {
            pawns: pawnMask(8, 15),
            knights: (1n << 1n) | (1n << 6n),
            bishops: (1n << 2n) | (1n << 5n),
            rooks: (1n << 0n) | (1n << 7n),
            queen: (1n << 3n),
            king: (1n << 4n),
        };

        //black pieces bitboard
        this.black = {
            pawns: pawnMask(48, 55),
            knights: (1n << 57n) | (1n << 62n),
            bishops: (1n << 58n) | (1n << 61n),
            rooks: (1n << 56n) | (1n << 63n),
            queen: (1n << 59n),
            king: (1n << 60n),
        };

        //inital board with occupied all pieces, white and black seperately {occupied, white, black}
        this.boardState = initialBoard(this.white, this.black);
    }


}


export default GameEngine


const board = new GameEngine()
board.display_board()