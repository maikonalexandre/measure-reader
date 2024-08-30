import { prisma } from '../../config/prisma';
import type {
	CreateImageProps,
	GetMeasureByCustomerProps,
	GetMeasureByIdProps,
	MeasureRepository,
	UpdateMeasure,
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

	async getMeasureByCustomer({
		customer_code,
		measure_datetime,
		measure_type,
	}: GetMeasureByCustomerProps) {
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

	async getMeasureById({ measure_uuid }: GetMeasureByIdProps) {
		const measure = await prisma.measure.findFirst({
			where: {
				id: measure_uuid,
			},
		});
		return measure;
	}

	async updateMeasure({ confirmed_value, measure_uuid }: UpdateMeasure) {
		const measure = await prisma.measure.update({
			where: {
				id: measure_uuid,
			},
			data: {
				measure_value: confirmed_value,
				has_confirmed: true,
			},
		});
		return measure;
	}
}

export const prismaMeasureRepository = new PrismaMeasureRepository();
