import type { ImageScanRepository } from '../repositories/image-scan-repository';
import type { ImageStorageRepository } from '../repositories/image-storage-repository';
import type { MeasureRepository } from '../repositories/measure-repository';
import { MeasureAlreadyExistsError } from './errors/measure-already-exists';

interface CreateMeasureProps {
	imageBase64: string;
	customer_code: string;
	measure_datetime: Date;
	measure_type: 'WATER' | 'GAS';
}

export class CreateMeasureUseCase {
	constructor(
		private imageStorageRepository: ImageStorageRepository,
		private measureRepository: MeasureRepository,
		private imageScanRepository: ImageScanRepository,
	) {}
	async execute({
		customer_code,
		measure_datetime,
		measure_type,
		imageBase64,
	}: CreateMeasureProps) {
		const measure = await this.measureRepository.getMeasure({
			customer_code,
			measure_datetime,
			measure_type,
		});

		if (measure) {
			throw new MeasureAlreadyExistsError();
		}

		const { imageFilename, mimetype } =
			await this.imageStorageRepository.save(imageBase64);

		const scannedMeasure = await this.imageScanRepository.scan({
			imagePath: `uploads/${imageFilename}`,
			mimetype: mimetype,
		});

		const newMeasure = await this.measureRepository.create({
			customer_code,
			image_address: `/uploads/${imageFilename}`,
			measure_datetime,
			measure_type,
			measure_value: Number.parseInt(scannedMeasure),
		});

		return newMeasure;
	}
}
