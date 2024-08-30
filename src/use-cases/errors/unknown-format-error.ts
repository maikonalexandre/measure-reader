export class UnknownFormatError extends Error {
	constructor() {
		super('Tipo de imagem não suportado');
	}
}
