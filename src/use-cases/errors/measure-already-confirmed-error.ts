export class MeasureAlreadyConfirmedError extends Error {
	constructor() {
		super('Leitura já confirmada');
	}
}
