import { Square } from "./interfaces.js";

namespace ChessPointers {

export class BasicPointer {
    readonly x : number;
    readonly y : number;
    readonly board : Square[][];

    constructor(x : number, y : number, board : Square[][]) {
        this.x = x; this.y = y; this.board = board;
    }

    at() : Square {
        return this.board[this.x][this.y];
    }

    getNeighbours() : BasicPointer[] {

        const ans: BasicPointer[] = [];

        const moveOne : number[] = [1, -1];

        moveOne.forEach((x) => {
            if (this.isWithinBounds(this.x + x, this.y)) ans.push(new BasicPointer(this.x + x, this.y, this.board))
        });
        moveOne.forEach((y) => {
            if (this.isWithinBounds(this.x, this.y + y)) ans.push(new BasicPointer(this.x, this.y + y, this.board))
        })

        return ans;
    }

    getPassableNeighbours() : BasicPointer[] {
        return this.getNeighbours().filter((pointer) => pointer.at().isPassable);
    }

    toString() {
        return `${this.x},${this.y}`;
    }

    static areSame(a : BasicPointer, b : BasicPointer) : boolean {
        return a.board === b.board && a.x === b.x && a.y === b.y;
    }

    protected isWithinBounds(x: number, y : number) : boolean {

        if (this.board[x] === undefined) return false;
        if (this.board[x][y] === undefined) return false;

        return true;
    }
}

export class KnightPointer extends BasicPointer {

    getNeighbours() : KnightPointer[] {

        const ans: KnightPointer[] = [];

        const moveOne : number[] = [1, -1];
        const moveTwo : number[] = [2, -2];

        moveOne.forEach((y) => {
            moveTwo.forEach((x) => {
                if (this.isWithinBounds(this.x + x, this.y + y)) ans.push(new KnightPointer(this.x + x, this.y + y, this.board))
                if (this.isWithinBounds(this.x + y, this.y + x)) ans.push(new KnightPointer(this.x + y, this.y +  x, this.board))
            })
        })

        return ans;
    }
}
};

export default ChessPointers;