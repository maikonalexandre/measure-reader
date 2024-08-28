export function getImageTypeFromBase64(base64String: string) {
	const signature = base64String.substring(0, 5);

	switch (signature) {
		case '/9j/4':
			return 'jpeg'; // JPEG/JPG
		case 'iVBOR':
			return 'png'; // PNG
		case 'UklGR':
			return 'webp'; // WebP
		default:
			return 'unknown';
	}
}
