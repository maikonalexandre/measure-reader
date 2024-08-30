export class unknownFormatError extends Error {
	constructor() {
		super('Image format is not supported');
	}
}
