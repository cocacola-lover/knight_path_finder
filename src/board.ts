import ChessPointer from "./chess_pointer.js";

import { Square } from "./interfaces.js";

function createEmptySquare () : Square {
    
    return {isPassable : true, weight : 1} as Square;
}

export default class Board {
    squares : Square[][];

    constructor(height : number, width : number) {
        this.squares = [];

        for (let i = 0; i < width; i++) {
            this.squares.push([]);
            for (let j = 0; j < height; j++) this.squares[i].push(createEmptySquare());
        }
    }

    forEach (func : (value : Square, x : number, y : number) => any) {
        for (let i = 0; i < this.squares.length; i++) {
            for (let j = 0; j < this.squares[0].length; j++) {
                func(this.squares[i][j], i, j);
            }
        }
    }

    createBasicPointer = (x : number, y: number) => new ChessPointer.BasicPointer(x, y, this.squares);
    createKnightPointer = (x : number, y: number) => new ChessPointer.KnightPointer(x, y, this.squares);
    createKingPointer = (x : number, y: number) => new ChessPointer.KingPointer(x, y, this.squares);
    createBishopPointer = (x : number, y: number) => new ChessPointer.BishopPointer(x, y, this.squares);
    createRookPointer = (x : number, y: number) => new ChessPointer.RookPointer(x, y, this.squares);
    createPawnPointer = (x : number, y: number) => new ChessPointer.PawnPointer(x, y, this.squares);
    createQueenPointer = (x : number, y: number) => new ChessPointer.QueenPointer(x, y, this.squares);

    setPassability (arr : boolean[][]) {
        this.forEach((value, x, y) => {
            this.squares[x][y].isPassable = arr[x][y];
        });
    }

    setWeight (arr : number[][]) {
        this.forEach((value, x, y) => {
            this.squares[x][y].weight = arr[x][y];
        });
    }
}