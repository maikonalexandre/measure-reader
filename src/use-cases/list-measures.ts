import type { MeasureRepository } from '../repositories/measure-repository';
import { MeasuresNotFoundError } from './errors/measures-not-found-error';

interface ListMeasureUseCaseProps {
	customer_code: string;
	measure_type?: 'WATER' | 'GAS';
}

export class ListMeasureUseCase {
	constructor(private measureRepository: MeasureRepository) {}

	async execute({ customer_code, measure_type }: ListMeasureUseCaseProps) {
		const measures = await this.measureRepository.listMeasureByCustomer({
			customer_code,
			measure_type,
		});

		if (measures.length === 0) {
			throw new MeasuresNotFoundError();
		}

		return measures;
	}
}
