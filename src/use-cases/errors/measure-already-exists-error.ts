export class MeasureAlreadyExistsError extends Error {
	constructor() {
		super('Measure already exists');
	}
}
