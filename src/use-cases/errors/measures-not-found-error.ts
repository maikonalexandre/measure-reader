export class MeasuresNotFoundError extends Error {
	constructor() {
		super('Measure not found exists');
	}
}
