import ChessPointer from "./chess_pointer"

export interface Square {
    distanceFromStart? : number,
    shortestPath? : ChessPointer,
    isPassable : boolean,
    weight : number
}

export enum SearchResult {
    SearchContinues, TargetFound, TargetNotFound
}

export interface SearchIterator {
    () : {result : SearchResult, from? : ChessPointer, to? : ChessPointer};
}
