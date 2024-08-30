export type ImageScanRepositoryProps = { imagePath: string; mimetype: string };

export interface ImageScanRepository {
	scan: ({
		imagePath,
		mimetype,
	}: ImageScanRepositoryProps) => Promise<string | null>;
}
