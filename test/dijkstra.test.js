import {Board, SearchResult, PathFindingIterators} from './../dist/index';

test("Testing Dijkstra", () => {
    const board = new Board(10, 10);

    const ite = PathFindingIterators.dijkstraSearchIterator(board.createBasicPointer(0,0), board.createBasicPointer(3, 1));
    while( (ite()).result === SearchResult.SearchContinues);

    expect(board.squares[3][1].distanceFromStart).not.toBe(undefined);
})