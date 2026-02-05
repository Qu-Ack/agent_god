export class Queue<T> {

	start: number;
	end: number;
	elements: T[]

	constructor() {
		this.start = -1;
		this.end = -1;
		this.elements = [];
	}

	push(elem: T) {
		if (this.start == -1 && this.end == -1) {
			this.elements.push(elem);
			this.start = 0;
			this.end = 0;
		} else {
			this.elements.push(elem);
			this.end++;
		}
	}

	pop() {
		if (this.start == -1 && this.end == -1) {
			return undefined
		} else {
			// we are not freeing memory
			// there would be elements at the start of the array that will hold memory.
			this.start++;
		}
	}

	print() {
		for (let i = this.start; i <= this.end; i++) {
			console.log(this.elements[i]);
		}
	}

	front() {
		return this.elements[this.start];
	}

	back() {
		if (this.end == -1) {
			return;
		} else {
			return this.elements[this.end];
		}

	}

	size() {
		return this.end - this.start + 1;
	}

	empty() {
		if (this.start == -1) return true;
		if ((this.end - this.start) + 1 == 0) return true;
	}
};
