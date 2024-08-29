export class MeasureAlreadyExistsError extends Error {
	constructor() {
		super('Measure Already Exists');
	}
}
