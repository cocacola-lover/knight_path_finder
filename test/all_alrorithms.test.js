import {buildBoard, search} from './../dist/index';

const canReach = (a, b, searchMethod) => {
    const board = buildBoard(10, 10);

    const ite = searchMethod(board.createPointer(a[0],a[1]), board.createPointer(b[0], b[1]));
    while(!ite());

    expect(board.squares[b[1]][b[0]].distanceFromStart).not.toBe(null);

    let walkBack = board.squares[b[1]][b[0]];
    while(walkBack.shortestPath !== null) walkBack = walkBack.shortestPath;
    expect(walkBack).toBe(board.createPointer(a[0],a[1]).at());
}

test("Testing if they can reach", () => {
    const points = [[0, 0], [3, 1], [5, 6], [3, 4], [5, 9], [1, 1]];
    for (let i = 0; i < points.length - 1; i++) {
        Object.values(search).forEach((method) => canReach(points[i], points[i+1], method));
    }
})