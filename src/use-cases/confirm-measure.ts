import type { MeasureRepository } from '../repositories/measure-repository';
import { MeasureAlreadyConfirmedError } from './errors/measure-already-confirmed-error';
import { MeasureDontExistsError } from './errors/measure-dont-exists-error';

interface ConfirmMeasureUseCaseProps {
	measure_uuid: string;
	confirmed_value: number;
}

export class ConfirmMeasureUseCase {
	constructor(private measureRepository: MeasureRepository) {}
	async execute({ confirmed_value, measure_uuid }: ConfirmMeasureUseCaseProps) {
		const measure = await this.measureRepository.getMeasureById({
			measure_uuid,
		});

		if (!measure) {
			throw new MeasureDontExistsError();
		}

		if (measure.has_confirmed === true) {
			throw new MeasureAlreadyConfirmedError();
		}

		const updatedMeasure = await this.measureRepository.updateMeasure({
			measure_uuid,
			confirmed_value,
		});

		return updatedMeasure;
	}
}

