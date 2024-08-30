import Fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';

import cors from '@fastify/cors';

export const app = Fastify();

app.register(cors, {
	origin: '*',
	methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
});

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Os dados fornecidos no corpo da requisição são inválidos',
			status: {
				code: 400,
				description: 'Os dados fornecidos no corpo da requisição são inválidos',
			},
			error_code: 'INVALID_DATA',
			error_description: error.format(),
		});
	}
	if (process.env.NODE_ENV !== 'production') {
		console.error(error);
	}
	return reply.status(500).send({ message: 'Internal server error' });
});
