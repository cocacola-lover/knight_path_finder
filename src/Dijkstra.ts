import ChessPointer from "./chess_pointer.js";
import { Square } from "./interfaces.js";
import OrderedLinkedList from "./ordered_linked_list.js";

interface Weight {
    weight : number | undefined;
}

export default function dijkstraSearchIterator(start : ChessPointer, end : ChessPointer) {

    start.at().distanceFromStart = 0;

    let queue = new OrderedLinkedList<ChessPointer>((a : ChessPointer, b : ChessPointer) => {
        // If weight exists on pointers than takes it. Otherwise set as 1
        const aweight = (a.at().other !== null ? ((a.at().other as Weight).weight !== undefined ? (a.at().other as Weight).weight : 1) : 1) as number; 
        const bweight = (b.at().other !== null ? ((b.at().other as Weight).weight !== undefined ? (b.at().other as Weight).weight : 1) : 1) as number; 

        if (bweight === aweight) return 1;
        return bweight - aweight;
    }, [start]);
    const explored = new Set<Square>();

    const iterate = () => {
        if (queue.isEmpty()) return null;

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

        (neighbours.filter((neighbour) => !explored.has(neighbour.at())))
        .forEach((neighbour) => queue.add(neighbour));

        return false;
    }

    return iterate;
}