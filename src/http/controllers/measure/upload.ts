import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { env } from '../../../env';
import { fileSystemImageStorageRepository } from '../../../repositories/fileSystemStorage/file-system-image-storage-repository';
import { geminiImageScanRepository } from '../../../repositories/gemini/gemini-image-scan-repository';
import { prismaMeasureRepository } from '../../../repositories/prisma/prisma-measure-repository';
import { CreateMeasureUseCase } from '../../../use-cases/create-measure';
import { ExternalAPIConnectionError } from '../../../use-cases/errors/external-api-connection-error';
import { MeasureAlreadyExistsError } from '../../../use-cases/errors/measure-already-exists-error';
import { UnknownFormatError } from '../../../use-cases/errors/unknown-format-error';
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

		reply.code(200).send({
			message: 'Operação realizada com sucesso',
			image_url: `${env.SERVER_BASE_URL}/${measure.image_address}`,
			measure_value: measure.measure_value,
			measure_uuid: measure.id,
		});
	} catch (error) {
		if (error instanceof MeasureAlreadyExistsError) {
			return reply.status(409).send({
				message: error.message,
				error_code: 'DOUBLE_REPORT',
				error_description: 'Leitura do mês já realizada',
			});
		}

		if (error instanceof UnknownFormatError)
			return reply.status(404).send({
				message: error.message,
				error_code: 'IMAGE ERROR',
				error_description: 'Tipo de imagem não suportado',
			});

		if (error instanceof ExternalAPIConnectionError) {
			return reply.status(502).send({
				message: error.message,
				error_code: 'IMAGE ERROR',
				error_description: 'Tipo de imagem não suportado',
			});
		}

		throw error;
	}
}
