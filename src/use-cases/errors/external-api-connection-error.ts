export class ExternalAPIConnectionError extends Error {
	constructor() {
		super('Gateway inválido. O serviço externo retornou um erro');
	}
}
