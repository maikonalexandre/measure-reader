import type { FastifyReply, FastifyRequest } from 'fastify';

export async function upload(request: FastifyRequest, reply: FastifyReply) {
	reply.code(200).send({ message: 'OK' });
}
