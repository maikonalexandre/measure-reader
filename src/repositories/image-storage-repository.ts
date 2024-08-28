interface ImagePreview {
	imagePreviewURL: string;
	imagePath: string;
}

export interface ImageStorageRepository {
	save: (image: string) => Promise<ImagePreview | null>;
}
