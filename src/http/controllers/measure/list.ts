import type { FastifyReply, FastifyRequest } from 'fastify';

export async function list(request: FastifyRequest, reply: FastifyReply) {
	reply.code(200).send({ message: 'OK' });
}
