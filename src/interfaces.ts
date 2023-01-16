export interface Square {
    distanceFromStart : number | null,
    shortestPath : Square | null,
    isPassable : boolean,
    other : Object | null
}