export class MeasureAlreadyConfirmedError extends Error {
	constructor() {
		super('Measure already confirmed');
	}
}
