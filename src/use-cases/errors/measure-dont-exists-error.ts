export class MeasureDontExistsError extends Error {
	constructor() {
		super('Leitura não encontrada');
	}
}
