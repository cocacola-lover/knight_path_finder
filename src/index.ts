import BasicPointer, {KnightPointer} from "./chess_pointer.js";
import Board from "./board.js";
import OrderedLinkedList from "./ordered_linked_list.js";
import { Square, SearchResult } from "./interfaces.js";

import { dijkstraSearchIterator, deepFirstSearchIterator } from "./searchAlgorithms.js";

const pointers = {BasicPointer, KnightPointer};
const iterators = {dijkstraSearchIterator, deepFirstSearchIterator}; 

export {
        pointers, iterators,
        OrderedLinkedList, Board,
        Square, SearchResult
        };
