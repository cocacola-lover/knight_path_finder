import ChessPointer from "./chess_pointer.js";
import { Square } from "./interfaces.js";

interface Board {
    squares : Square[][],
    createPointer(x:number, y : number): ChessPointer;
}


function createEmptySquare () : Square {
    return {distanceFromStart : null,
        shortestPath : null,
        isPassable : true,
        other : null} as Square;
}

export default function buildBoard(width : number, length : number) : Board {

    const squares : Square[][] = [];

    for (let i = 0; i < length; i++) {

        squares.push([]);

        for (let j = 0; j < width; j++) squares[i].push(createEmptySquare());
    }

    const createPointer = (x : number, y: number) => new ChessPointer(x, y, squares);

    return {squares, createPointer};

}