import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prismaMeasureRepository } from '../../../repositories/prisma/prisma-measure-repository';
import { ConfirmMeasureUseCase } from '../../../use-cases/confirm-measure';
import { MeasureAlreadyConfirmedError } from '../../../use-cases/errors/measure-already-confirmed-error';
import { MeasureDontExistsError } from '../../../use-cases/errors/measure-dont-exists-error';

const confirmMeasureSchema = z.object({
	measure_uuid: z.string().uuid(),
	confirmed_value: z.number().int(),
});

export async function confirm(request: FastifyRequest, reply: FastifyReply) {
	const { confirmed_value, measure_uuid } = confirmMeasureSchema.parse(
		request.body,
	);

	try {
		const confirmMeasureUseCase = new ConfirmMeasureUseCase(
			prismaMeasureRepository,
		);

		await confirmMeasureUseCase.execute({ confirmed_value, measure_uuid });
		reply.code(200).send({
			message: 'Operação realizada com sucesso',
			status: {
				code: 200,
				description: 'Operação realizada com sucesso',
			},
			success: 'true',
		});
	} catch (error) {
		if (error instanceof MeasureAlreadyConfirmedError) {
			reply.code(409).send({
				message: 'Leitura já confirmada',
				status: {
					code: 409,
					description: 'Leitura já confirmada',
				},
				error_code: 'MEASURE_NOT_FOUND',
				error_description: 'Leitura do mês já confirmada',
			});
		}

		if (error instanceof MeasureDontExistsError) {
			reply.code(404).send({
				message: 'Leitura não encontrada',
				status: {
					code: 404,
					description: 'Leitura não encontrada',
				},
				error_code: 'MEASURE_NOT_FOUND',
				error_description: 'Leitura do mês não encontrada',
			});
		}
		throw error;
	}
}
