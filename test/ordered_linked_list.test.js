import {OrderedLinkedList} from '../dist/index.js';

test("Ordered Linked List convert from array", () => {
    let arr = [2, 1, 1, 5, 6, 1];
    const compareFunction = (a, b) => b - a;

    const list = new OrderedLinkedList(compareFunction, arr);
    arr.sort(compareFunction).forEach((e) => expect(e).toBe(list.shift()));
});

test("Ordered Linked List start with nothing", () => {
    let arr = [2, 1, 1, 5, 6, 1];
    const compareFunction = (a, b) => b - a;

    const list = new OrderedLinkedList(compareFunction);
    arr.forEach((e) => list.add(e));
    arr.sort(compareFunction).forEach((e) => expect(e).toBe(list.shift()));
})