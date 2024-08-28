import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { env } from '../../../env';

import { writeFile, writeFileSync } from 'node:fs';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { fileSystemImageStorageRepository } from '../../../repositories/fileSystemStorage/file-system-image-storage-repository';
import { SaveImageUseCase } from '../../../use-cases/save-image-use-case';
import { getImageTypeFromBase64 } from '../../../utils';

const uploadImageSchema = z.object({
	image: z
		.string()
		.base64()
		.refine((value) => {
			const imgType = getImageTypeFromBase64(value);
			if (imgType === 'unknown') {
				return false;
			}
		}),
	customer_code: z.string(),
	measure_datetime: z.coerce.date(),
	measure_type: z.enum(['WATER', 'GAS']),
});

export async function upload(request: FastifyRequest, reply: FastifyReply) {
	const { customer_code, image, measure_datetime, measure_type } =
		uploadImageSchema.parse(request.body);

	const saveImageUseCase = new SaveImageUseCase(
		fileSystemImageStorageRepository,
	);

	const { imagePath, imagePreviewURL } = await saveImageUseCase.execute({
		image,
	});

	console.log(imagePath, imagePreviewURL);

	const fileManager = new GoogleAIFileManager(env.GEMINI_API_KEY);

	const uploadResponse = await fileManager.uploadFile(imagePath, {
		mimeType: 'image/jpeg',
	});

	const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({
		model: 'gemini-1.5-flash',
	});

	const result = await model.generateContent([
		{
			fileData: {
				mimeType: uploadResponse.file.mimeType,
				fileUri: uploadResponse.file.uri,
			},
		},
		{
			text: 'This is a picture of a measurement record. I need the exact number that is being shown in the record, just the number, nothing more.',
		},
	]);

	console.log('RESULT', result.response.text());

	reply.code(200).send({ message: 'OK' });
}
