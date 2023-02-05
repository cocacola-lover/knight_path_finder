
class ListItem<T> {
    next : ListItem<T> | null = null;
    value : T;

    constructor(value : T) {this.value = value;}
}

export default class OrderedLinkedList<T> {
    private start : ListItem<T> | null = null;
    // If negative then don't switch else switch
    private compareFunction : (a : T, b : T) => number;

    constructor(compareFunction : (a : T, b : T) => number, arr : T[] = []) {

        const checkForSorted = (compareFunction : (a : T, b : T) => number, arr : T[] = []) => {
            for (let i = 0; i < arr.length - 1; i++) {
                if (compareFunction(arr[i], arr[i+1]) > 0) return false;
            }
            return true;
        }
        const readInArray = (arr : T[]) => {
            this.start = new ListItem<T>(arr[0]);
            let pos = this.start;

            for (let i = 1; i < arr.length; i++) {
                const newItem = new ListItem<T>(arr[i]);
                pos.next = newItem;
                pos = newItem;
            }
        }

        this.compareFunction = compareFunction;

        if (arr.length === 0) return;

        if (!checkForSorted(this.compareFunction, arr)) arr = arr.sort(this.compareFunction);

        readInArray(arr);
    }

    isEmpty() : boolean {return this.start === null}

    shift () : T | undefined {
        if (this.start === null) return undefined;
        let ans = this.start.value;
        this.start = this.start.next;

        return ans;
    }

    pickIn () : T | undefined {
        if (this.start === null) return undefined;

        return this.start.value;
    }

    add(a : T) {
        if (this.start === null) {
            this.start = new ListItem<T>(a);
            return;
        }

        let pos : ListItem<T> | null = this.start;
        let before : ListItem<T> | null = null;
        while (pos !== null && this.compareFunction(a, pos.value) > 0) {
            before = pos;
            pos = pos.next;
        }
        const newItem = new ListItem<T>(a);

        if (before !== null) before.next = newItem;
        else {this.start = newItem;}
        newItem.next = pos;
    }
}