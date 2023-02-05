import { Square } from "./interfaces.js";

export default class ChessPointer {
    readonly x : number;
    readonly y : number;
    readonly board : Square[][];

    constructor(x : number, y : number, board : Square[][]) {
        this.x = x; this.y = y; this.board = board;
    }

    at() : Square {
        return this.board[this.y][this.x];
    }

    getNeighbours() : ChessPointer[] {

        const ans: ChessPointer[] = [];

        const moveOne : number[] = [1, -1];
        const moveTwo : number[] = [2, -2];

        moveOne.forEach((y) => {
            moveTwo.forEach((x) => {
                if (this.isWithinBounds(this.x + x, this.y + y)) ans.push(new ChessPointer(this.x + x, this.y + y, this.board))
                if (this.isWithinBounds(this.x + y, this.y + x)) ans.push(new ChessPointer(this.x + y, this.y +  x, this.board))
            })
        })

        return ans;
    }

    getPassableNeighbours() : ChessPointer[] {
        return this.getNeighbours().filter((pointer) => pointer.at().isPassable);
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    static areSame(a : ChessPointer, b : ChessPointer) : boolean {
        return a.board === b.board && a.x === b.x && a.y === b.y;
    }

    private isWithinBounds(x: number, y : number) : boolean {

        if (this.board[y] === undefined) return false;
        if (this.board[y][x] === undefined) return false;

        return true;
    }
}
