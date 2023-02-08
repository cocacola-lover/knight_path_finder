import BasicPointer from "./chess_pointer"

export interface Square {
    distanceFromStart? : number,
    shortestPath? : BasicPointer,
    isPassable : boolean,
    weight : number
}

export enum SearchResult {
    SearchContinues, TargetFound, TargetNotFound
}

export interface SearchIterator {
    () : {result : SearchResult, from? : BasicPointer, to? : BasicPointer};
}
