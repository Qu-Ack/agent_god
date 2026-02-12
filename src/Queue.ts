export class Queue<T> {
	private start: number;
	private end: number;
	private elements: T[];

	constructor() {
		this.start = -1;
		this.end = -1;
		this.elements = [];
	}

	push(elem: T): void {
		if (this.start === -1 && this.end === -1) {
			this.start = 0;
			this.end = 0;
		} else {
			this.end++;
		}
		this.elements.push(elem);
	}

	pop(): T | undefined {
		if (this.start === -1 || this.start > this.end) {
			return undefined;
		}

		const elem = this.elements[this.start];
		this.start++;

		if (this.start > this.end) {
			this.start = -1;
			this.end = -1;
			this.elements = []; 
		}

		return elem;
	}

	print(): void {
		for (let i = this.start; i <= this.end; i++) {
			console.log(this.elements[i]);
		}
	}

	front(): T | undefined {
		if (this.start === -1) return undefined;
		return this.elements[this.start];
	}

	back(): T | undefined {
		if (this.end === -1) return undefined;
		return this.elements[this.end];
	}

	size(): number {
		if (this.start === -1) return 0;
		return this.end - this.start + 1;
	}

	empty(): boolean {
		return this.start === -1 || this.start > this.end;
	}
}
