import { prisma } from '../../config/prisma';
import type {
	CreateImageProps,
	GetMeasureProps,
	MeasureRepository,
} from '../measure-repository';

import { endOfMonth, startOfMonth } from 'date-fns';

class PrismaMeasureRepository implements MeasureRepository {
	async create({
		customer_code,
		measure_datetime,
		measure_type,
		image_address,
		measure_value,
	}: CreateImageProps) {
		const measure = await prisma.measure.create({
			data: {
				customer_code,
				has_confirmed: false,
				measure_datetime,
				measure_type,
				image_address,
				measure_value,
			},
		});

		return measure;
	}

	async getMeasure({
		customer_code,
		measure_datetime,
		measure_type,
	}: GetMeasureProps) {
		const startOfReceivedMonth = startOfMonth(measure_datetime);
		const endOfReceivedMonth = endOfMonth(measure_datetime);

		const measure = await prisma.measure.findFirst({
			where: {
				customer_code,
				measure_type,
				measure_datetime: {
					gte: startOfReceivedMonth,
					lte: endOfReceivedMonth,
				},
			},
		});

		return measure;
	}
}

export const prismaMeasureRepository = new PrismaMeasureRepository();
