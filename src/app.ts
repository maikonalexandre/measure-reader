import Fastify from 'fastify';
import { ZodError } from 'zod';
import { appRoutes } from './http/routes';

import { join } from 'node:path';
import cors from '@fastify/cors';

export const app = Fastify();

app.register(cors, {
	origin: '*',
	methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
});

console.log(__dirname, 'uploads');

app.register(require('@fastify/static'), {
	root: join(__dirname, '..', 'uploads'),
	prefix: '/uploads/',
});

app.register(appRoutes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply.status(400).send({
			message: 'Os dados fornecidos no corpo da requisição são inválidos',
			error_code: 'INVALID_DATA',
			error_description: error.format(),
		});
	}
	if (process.env.NODE_ENV !== 'production') {
		console.error(error);
	}
	return reply.status(500).send({ message: 'Internal server error' });
});
