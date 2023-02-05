import {Board, ChessPointer, SearchResult, deepFirstSearchIterator, dijkstraSearchIterator} from './../dist/index';

const search = {deepFirstSearchIterator, dijkstraSearchIterator};

const canReach = (a, b, searchMethod) => {
    const board = new Board(10, 10);

    const ite = searchMethod(board.createPointer(a[0],a[1]), board.createPointer(b[0], b[1]));
    while((ite()).result === SearchResult.SearchContinues);

    expect(board.squares[b[0]][b[1]].distanceFromStart).not.toBe(undefined);

    let walkBack = board.squares[b[0]][b[1]];
    while(walkBack.shortestPath !== undefined) walkBack = walkBack.shortestPath.at();
    expect(walkBack).toBe(board.createPointer(a[0],a[1]).at());
}

test("Testing if they can reach", () => {
    const points = [[0, 0], [3, 1], [5, 6], [3, 4], [5, 9], [1, 1]];
    for (let i = 0; i < points.length - 1; i++) {
        Object.values(search).forEach((method) => canReach(points[i], points[i+1], method));
    }
})