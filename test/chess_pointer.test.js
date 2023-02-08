import {ChessPointers, Board} from './../dist/index';

test("Build Board works properly", () => {
    const board = new Board(10, 10);

    expect(board.squares.length).toBe(10);
    for (let i = 0; i < 10; i++) expect(board.squares[0].length).toBe(10);

    expect(board.createKnightPointer(0, 3)).toEqual(board.createKnightPointer(0,3));
    expect(board.createKnightPointer(0, 3)).not.toBe(board.createKnightPointer(0,3));
});

test("ChessPointer works properly", () => {
    const board = new Board(10, 10);

    const pointer = board.createKnightPointer(0, 0);
    expect(pointer.getPassableNeighbours()).toEqual([
        new ChessPointers.KnightPointer(2, 1, board.squares),
        new ChessPointers.KnightPointer(1, 2, board.squares), 
    ])

    const neighbourSquares = board.createKnightPointer(2, 1).getPassableNeighbours().map((e) => e.at());
    [
        new ChessPointers.KnightPointer(0, 0, board.squares),
        new ChessPointers.KnightPointer(0, 2, board.squares),
        new ChessPointers.KnightPointer(4, 0, board.squares),
        new ChessPointers.KnightPointer(4, 2, board.squares), 
        new ChessPointers.KnightPointer(3, 3, board.squares),
        new ChessPointers.KnightPointer(1, 3, board.squares), 
    ].forEach((pointer) => expect(neighbourSquares).toContain(pointer.at()))
    
});

