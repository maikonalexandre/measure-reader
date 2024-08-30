import { GoogleGenerativeAI } from '@google/generative-ai';
import {
	GoogleAIFileManager,
	type UploadFileResponse,
} from '@google/generative-ai/server';
import { env } from '../../env';
import { ExternalAPIConnectionError } from '../../use-cases/errors/external-api-connection-error';
import type {
	ImageScanRepository,
	ImageScanRepositoryProps,
} from '../image-scan-repository';

class GeminiImageScanRepository implements ImageScanRepository {
	async scan({ imagePath, mimetype }: ImageScanRepositoryProps) {
		let attempt = 0;

		while (attempt <= env.GEMINI_MAX_RETRIES) {
			try {
				const uploadResponse = await this.uploadImage({ imagePath, mimetype });
				const measure = await this.generateMeasure(uploadResponse);
				return measure;
			} catch (error) {
				if (attempt === env.GEMINI_MAX_RETRIES) {
					throw new ExternalAPIConnectionError();
				}

				attempt++;
			}
		}
	}

	private async uploadImage({ imagePath, mimetype }: ImageScanRepositoryProps) {
		const fileManager = new GoogleAIFileManager(env.GEMINI_API_KEY);
		const uploadResponse = await fileManager.uploadFile(imagePath, {
			mimeType: mimetype,
		});

		return uploadResponse;
	}

	private async generateMeasure(uploadResponse: UploadFileResponse) {
		const prompt =
			'This is a picture of a measurement record. I need the exact number that is being shown in the record, just the number, nothing more.';

		const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
		const model = genAI.getGenerativeModel({
			model: 'gemini-env.PORT.5-flash',
		});

		const result = await model.generateContent([
			{
				fileData: {
					mimeType: uploadResponse.file.mimeType,
					fileUri: uploadResponse.file.uri,
				},
			},
			{
				text: prompt,
			},
		]);

		return result.response.text();
	}
}

export const geminiImageScanRepository = new GeminiImageScanRepository();
