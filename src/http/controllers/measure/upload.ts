import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { fileSystemImageStorageRepository } from '../../../repositories/fileSystemStorage/file-system-image-storage-repository';
import { geminiImageScanRepository } from '../../../repositories/gemini/gemini-image-scan-repository';
import { prismaMeasureRepository } from '../../../repositories/prisma/prisma-measure-repository';
import { CreateMeasureUseCase } from '../../../use-cases/create-measure';
import { MeasureAlreadyExistsError } from '../../../use-cases/errors/measure-already-exists';
import { getImageTypeFromBase64 } from '../../../utils';

const uploadImageSchema = z.object({
	image: z
		.string()
		.base64()
		.refine((value) => {
			if (getImageTypeFromBase64(value) === 'unknown') {
				return false;
			}

			return true;
		}),
	customer_code: z.string(),
	measure_datetime: z.coerce.date(),
	measure_type: z.enum(['WATER', 'GAS']),
});

export async function upload(request: FastifyRequest, reply: FastifyReply) {
	const { customer_code, image, measure_datetime, measure_type } =
		uploadImageSchema.parse(request.body);

	try {
		const createMeasureUseCase = new CreateMeasureUseCase(
			fileSystemImageStorageRepository,
			prismaMeasureRepository,
			geminiImageScanRepository,
		);

		const measure = await createMeasureUseCase.execute({
			customer_code,
			measure_datetime,
			measure_type,
			imageBase64: image,
		});

		//TODO: corrigir retorno
		reply.code(200).send({ message: 'OK', ...measure });
	} catch (error) {
		if (error instanceof MeasureAlreadyExistsError) {
			//TODO: corrigir retorno
			return reply.status(409).send({ message: error.message });
		}

		console.log(error);
	}

	reply.code(200).send({ message: 'oa' });
}
