import {ChessPointer, buildBoard} from './../dist/index';

test("Build Board works properly", () => {
    const board = buildBoard(10, 10);

    expect(board.squares.length).toBe(10);
    for (let i = 0; i < 10; i++) expect(board.squares[0].length).toBe(10);

    expect(board.createPointer(0, 3)).toEqual(board.createPointer(0,3));
    expect(board.createPointer(0, 3)).not.toBe(board.createPointer(0,3));
});

test("ChessPointer works properly", () => {
    const board = buildBoard(10, 10);

    const pointer = board.createPointer(0, 0);
    expect(pointer.getPassableNeighbours()).toEqual([
        new ChessPointer(2, 1, board.squares),
        new ChessPointer(1, 2, board.squares), 
    ])

    const neighbourSquares = board.createPointer(2, 1).getPassableNeighbours().map((e) => e.at());
    [
        new ChessPointer(0, 0, board.squares),
        new ChessPointer(0, 2, board.squares),
        new ChessPointer(4, 0, board.squares),
        new ChessPointer(4, 2, board.squares), 
        new ChessPointer(3, 3, board.squares),
        new ChessPointer(1, 3, board.squares), 
    ].forEach((pointer) => expect(neighbourSquares).toContain(pointer.at()))
    
});

