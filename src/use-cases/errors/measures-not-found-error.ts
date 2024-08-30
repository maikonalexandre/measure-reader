export class MeasuresNotFoundError extends Error {
	constructor() {
		super('Nenhum registro encontrado');
	}
}
