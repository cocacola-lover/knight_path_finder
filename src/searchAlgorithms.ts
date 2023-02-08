import BasicPointer from "./chess_pointer.js";
import { Square, SearchIterator, SearchResult } from "./interfaces.js";
import OrderedLinkedList from "./ordered_linked_list.js";

interface OrderFunction {(a : BasicPointer, b : BasicPointer) : number}

interface BaseSearchParameters {
    start : BasicPointer,
    end : BasicPointer, 
    orderFunction : OrderFunction
}

function baseSearchIterator ({start, end, orderFunction} : BaseSearchParameters) {

    start.at().distanceFromStart = 0;

    let queue = new OrderedLinkedList<BasicPointer>(orderFunction, [start]);
    const explored = new Set<string>();

    const iterate = () => {
        if (queue.isEmpty()) return {result : SearchResult.TargetNotFound};

        let pointer : BasicPointer;
        
        while (true) {

            if (queue.pickIn() === undefined) return {result : SearchResult.TargetNotFound};
            if (BasicPointer.areSame(queue.pickIn() as BasicPointer, end)) return {result : SearchResult.TargetFound};

            pointer = queue.shift() as BasicPointer;

            if (explored.has(pointer.toString())) { continue; }
            else { break; }
        }

        explored.add(pointer.toString());

        const neighbours = pointer.getPassableNeighbours();
        for (let i = 0; i < neighbours.length; i++)
        {
            const neighbour = neighbours[i];
            if (neighbour.at().distanceFromStart !== undefined &&
             (neighbour.at().distanceFromStart as number) < (pointer.at().distanceFromStart as number + 1)) continue;

            neighbour.at().distanceFromStart = pointer.at().distanceFromStart as number + 1;
            neighbour.at().shortestPath = pointer;
        }

        let checkIfEndFound = false;

        (neighbours.filter((neighbour) => !explored.has(neighbour.toString())))
        .forEach((neighbour) => {
            if (BasicPointer.areSame(neighbour, end)) {
                queue = new OrderedLinkedList<BasicPointer>(orderFunction, [end]);
                checkIfEndFound = true;
            }

            if (!checkIfEndFound) queue.add(neighbour);
        });

        return {result : SearchResult.SearchContinues, from : pointer.at().shortestPath, to : pointer};
    }

    return iterate;
}

export function deepFirstSearchIterator(start : BasicPointer, end : BasicPointer) {
    return baseSearchIterator({start, end, orderFunction : (a : BasicPointer, b : BasicPointer) => {
        return -1;
    }} as BaseSearchParameters)
}

export function dijkstraSearchIterator(start : BasicPointer, end : BasicPointer) {
    return baseSearchIterator({start, end, orderFunction : (a : BasicPointer, b : BasicPointer) => {

        const aweight = a.at().weight;
        const bweight = b.at().weight;

        if (bweight === aweight) return 1;
        return aweight - bweight;
    }} as BaseSearchParameters)
}
