import { randomUUID } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { getImageTypeFromBase64 } from '../../utils/index.js';
import type { ImageStorageRepository } from '../image-storage-repository.js';

class FileSystemImageStorageRepository implements ImageStorageRepository {
	async save(image: string) {
		const imageBuffer = Buffer.from(image, 'base64');
		const imagePath = `uploads/${randomUUID()}.jpg`;
		writeFileSync(imagePath, imageBuffer);

		return {
			imagePreviewURL: 'imagem.jpg',
			imagePath,
		};
	}
}

export const fileSystemImageStorageRepository =
	new FileSystemImageStorageRepository();
