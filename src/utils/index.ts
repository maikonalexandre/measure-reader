import { writeFile } from 'node:fs';
import { promisify } from 'node:util';

export function getImageTypeFromBase64(base64String: string) {
	const signature = base64String.substring(0, 5);

	switch (signature) {
		case '/9j/4':
			return 'jpeg';
		case 'iVBOR':
			return 'png';
		case 'UklGR':
			return 'webp';
		default:
			return 'unknown';
	}
}

export const writeFileAsync = promisify(writeFile);
