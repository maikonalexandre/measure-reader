import type { ImageStorageRepository } from '../repositories/image-storage-repository';

interface SaveImageUseCaseProps {
	image: string;
}

export class SaveImageUseCase {
	constructor(private imageStorageRepository: ImageStorageRepository) {}
	async execute({ image }: SaveImageUseCaseProps) {
		return await this.imageStorageRepository.save(image);
	}
}