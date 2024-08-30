import { randomUUID } from 'node:crypto';
import { UnknownFormatError } from '../../use-cases/errors/unknown-format-error.js';
import { getImageTypeFromBase64, writeFileAsync } from '../../utils/index.js';
import type {
	ImagePreview,
	ImageStorageRepository,
} from '../image-storage-repository.js';

class FileSystemImageStorageRepository implements ImageStorageRepository {
	async save(imageBase64String: string): Promise<ImagePreview> {
		const imageType = getImageTypeFromBase64(imageBase64String);

		if (imageType === 'unknown') {
			throw new UnknownFormatError();
		}

		const imageID = randomUUID();
		const imageFilename = `${imageID}.${imageType}`;

		const imageBuffer = Buffer.from(imageBase64String, 'base64');

		await writeFileAsync(`uploads/${imageFilename}`, imageBuffer);

		return {
			imageFilename,
			mimetype: `image/${imageType}`,
		};
	}
}

export const fileSystemImageStorageRepository =
	new FileSystemImageStorageRepository();
