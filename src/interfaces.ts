import ChessPointer from "./chess_pointer"

export interface Square {
    distanceFromStart? : number,
    shortestPath? : ChessPointer.BasicPointer,
    isPassable : boolean,
    weight : number
}

export enum SearchResult {
    SearchContinues, TargetFound, TargetNotFound
}

export interface SearchIterator {
    () : {result : SearchResult, from? : ChessPointer.BasicPointer, to? : ChessPointer.BasicPointer};
}
