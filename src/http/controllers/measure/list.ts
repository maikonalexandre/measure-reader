import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { env } from '../../../env';
import { prismaMeasureRepository } from '../../../repositories/prisma/prisma-measure-repository';
import { MeasuresNotFoundError } from '../../../use-cases/errors/measures-not-found-error';
import { ListMeasureUseCase } from '../../../use-cases/list-measures';

const paramsSchema = z.object({
	customer_code: z.string(),
});

export async function list(request: FastifyRequest, reply: FastifyReply) {
	const { customer_code } = paramsSchema.parse(request.params);
	const { measure_type } = request.query as {
		measure_type: string | undefined;
	};

	const measureAvailableTypes = ['WATER', 'GAS'];

	if (measure_type !== undefined) {
		if (!measureAvailableTypes.includes(measure_type?.toUpperCase())) {
			reply.code(400).send({
				message: 'Parâmetro measure type diferente de WATER ou GAS',
				error_code: 'INVALID_TYPE',
				error_description: 'Tipo de medição não permitida',
			});
		}
	}
	try {
		const listMeasureUseCase = new ListMeasureUseCase(prismaMeasureRepository);

		const measures = await listMeasureUseCase.execute({
			customer_code,
			measure_type: measure_type?.toUpperCase() as 'WATER' | 'GAS' | undefined,
		});

		const refactoredMeasures = measures.map((measure) => {
			return {
				measure_uuid: measure.id,
				measure_datetime: measure.measure_datetime,
				measure_type: measure.measure_type,
				has_confirmed: measure.has_confirmed,
				image_url: `${env.SERVER_BASE_URL}/${measure.image_address}`,
			};
		});

		reply.code(200).send({
			message: 'Operação realizada com sucesso',
			customer_code,
			measures: refactoredMeasures,
		});
	} catch (error) {
		if (error instanceof MeasuresNotFoundError) {
			reply.code(404).send({
				message: error.message,
				error_code: 'MEASURES_NOT_FOUND',
				error_description: 'Nenhuma leitura encontrada',
			});
		}

		throw error;
	}
}
