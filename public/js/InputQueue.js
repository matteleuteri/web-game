export default class InputQueue {
  constructor() {
    this.elements = {};
    this.size = 0;
  }
  enqueue(element) {
    this.elements[this.tail] = element;
    this.size++;
  }
  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.size--;
    return item;
  }
  peek() {
    return this.elements[this.head];
  }
  get length() {
    return this.size;
  }
  get isEmpty() {
    return this.size === 0;
  }
}