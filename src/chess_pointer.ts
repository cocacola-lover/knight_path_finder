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

export class KingPointer extends BasicPointer {
    getNeighbours() : KingPointer[] {

        const ans: KingPointer[] = [];

        const moveOne : number[] = [1, -1, 0];

        moveOne.forEach((y) => {
            moveOne.forEach((x) => {
                if (this.isWithinBounds(this.x + x, this.y + y)) ans.push(new KingPointer(this.x + x, this.y + y, this.board))
                if (this.isWithinBounds(this.x + y, this.y + x)) ans.push(new KingPointer(this.x + y, this.y +  x, this.board))
            })
        })

        return ans;
    }
}

export class BishopPointer extends BasicPointer {
    getNeighbours() : BishopPointer[] {

        const ans: BishopPointer[] = [];

        const moveDiagonal : number[][] = [[1, 1], [-1, -1], [-1, 1], [1, -1]];

        moveDiagonal.forEach((pair) => {

            let [x, y] = pair;

            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y + y * i); i++)
                ans.push(new BishopPointer(this.x + x * i, this.y + y * i, this.board));
        })

        return ans;
    }

    getPassableNeighbours(): BishopPointer[] {
        const ans: BishopPointer[] = [];

        const moveDiagonal : number[][] = [[1, 1], [-1, -1], [-1, 1], [1, -1]];

        moveDiagonal.forEach((pair) => {

            let [x, y] = pair;

            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y + y * i); i++){
                const newPointer = new BishopPointer(this.x + x * i, this.y + y * i, this.board);

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        })

        return ans;
    }
}

export class RookPointer extends BasicPointer {
    getNeighbours() : RookPointer[] {

        const ans: RookPointer[] = [];

        const moveOne : number[] = [1, -1];

        moveOne.forEach((x) => {
            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y); i++)
                ans.push(new RookPointer(this.x + x, this.y, this.board))
        });
        moveOne.forEach((y) => {
            for (let i = 1; this.isWithinBounds(this.x, this.y + y * i); i++)
                ans.push(new RookPointer(this.x, this.y + y * i, this.board))
        })

        return ans;
    }

    getPassableNeighbours() : RookPointer[] {

        const ans: RookPointer[] = [];

        const moveOne : number[] = [1, -1];

        moveOne.forEach((x) => {
            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y); i++){
                const newPointer = new RookPointer(this.x + x * i, this.y, this.board)

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        });
        moveOne.forEach((y) => {
            for (let i = 1; this.isWithinBounds(this.x, this.y + y * i); i++){
                const newPointer = new RookPointer(this.x, this.y + y * i, this.board)

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        })

        return ans;
    }
}

export class PawnPointer extends BasicPointer {
    getNeighbours() : PawnPointer[] {

        const ans: PawnPointer[] = [];

        if (this.isWithinBounds(this.x, this.y + 1)) 
            ans.push(new PawnPointer(this.x, this.y + 1, this.board));

        return ans;
    }
}

export class QueenPointer extends BasicPointer {
    getNeighbours() : QueenPointer[] {

        const ans: QueenPointer[] = [];

        const moveDiagonal : number[][] = [[1, 1], [-1, -1], [-1, 1], [1, -1]];

        moveDiagonal.forEach((pair) => {

            let [x, y] = pair;

            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y + y * i); i++){
                const newPointer = new QueenPointer(this.x + x * i, this.y + y * i, this.board);

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        });

        const moveOne : number[] = [1, -1];

        moveOne.forEach((x) => {
            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y); i++)
                ans.push(new QueenPointer(this.x + x, this.y, this.board))
        });
        moveOne.forEach((y) => {
            for (let i = 1; this.isWithinBounds(this.x, this.y + y * i); i++)
                ans.push(new QueenPointer(this.x, this.y + y * i, this.board))
        })

        return ans;
    }

    getPassableNeighbours() : QueenPointer[] {

        const ans: QueenPointer[] = [];

        const moveDiagonal : number[][] = [[1, 1], [-1, -1], [-1, 1], [1, -1]];

        moveDiagonal.forEach((pair) => {

            let [x, y] = pair;

            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y + y * i); i++)
                ans.push(new QueenPointer(this.x + x * i, this.y + y * i, this.board));
        });

        const moveOne : number[] = [1, -1];

        moveOne.forEach((x) => {
            for (let i = 1; this.isWithinBounds(this.x + x * i, this.y); i++){
                const newPointer = new QueenPointer(this.x + x * i, this.y, this.board)

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        });
        moveOne.forEach((y) => {
            for (let i = 1; this.isWithinBounds(this.x, this.y + y * i); i++){
                const newPointer = new QueenPointer(this.x, this.y + y * i, this.board)

                if (newPointer.at().isPassable) ans.push(newPointer);
                else break;
            }
        })

        return ans;
    }
}




};

export default ChessPointers;