import type { FastifyInstance } from 'fastify';

export async function appRoutes(app: FastifyInstance) {
	app.post('/test', () => {
		console.log('hi');
	});
}
