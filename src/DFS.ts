import ChessPointer from "./chess_pointer.js";
import { Square } from "./interfaces.js";

export default function deepFirstSearchIterator(start : ChessPointer, end : ChessPointer) {

    start.at().distanceFromStart = 0;

    let queue : ChessPointer[] = [start];
    const explored = new Set<Square>();

    const iterate = () => {
        if (queue.length === 0) return null;

        let pointer = queue.shift() as ChessPointer;
        if (ChessPointer.areSame(pointer, end)) return true;
        while (pointer !== undefined && explored.has(pointer.at())) pointer = queue.shift() as ChessPointer;
        if (pointer === undefined) return true;

        explored.add(pointer.at());
        const neighbours = pointer.getPassableNeighbours();
        for (let i = 0; i < neighbours.length; i++)
        {
            const neighbour = neighbours[i];
            if (neighbour.at().distanceFromStart !== null &&
             (neighbour.at().distanceFromStart as number) < (pointer.at().distanceFromStart as number + 1)) continue;

            neighbour.at().distanceFromStart = pointer.at().distanceFromStart as number + 1;
            neighbour.at().shortestPath = pointer.at();
        }

        queue = [...queue, ...(neighbours.filter((neighbour) => !explored.has(neighbour.at())))];
        return false;
    }

    return iterate;
}