import ChessPointer from "./chess_pointer.js";
import { Square } from "./interfaces.js";

function createEmptySquare () : Square {
    
    return {isPassable : true, weight : 1} as Square;
}

export default class Board {
    squares : Square[][];

    constructor(width : number, length : number) {
        this.squares = [];

        for (let i = 0; i < length; i++) {
            this.squares.push([]);
            for (let j = 0; j < width; j++) this.squares[i].push(createEmptySquare());
        }
    }

    createPointer (x : number, y: number) {
        return new ChessPointer(x, y, this.squares);
    }
}