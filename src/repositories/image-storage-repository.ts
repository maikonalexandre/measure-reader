export type ImagePreview = {
	imageFilename: string;
	mimetype: 'image/jpeg' | 'image/png' | 'image/webp';
};

export interface ImageStorageRepository {
	save: (imageBase64String: string) => Promise<ImagePreview | null>;
}
