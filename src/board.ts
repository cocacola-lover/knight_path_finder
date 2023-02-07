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

    createPointer (x : number, y: number) {
        return new ChessPointer(x, y, this.squares);
    }
}