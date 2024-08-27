import type { FastifyInstance } from 'fastify';
import { confirm } from '../controllers/measure/confirm';
import { list } from '../controllers/measure/list';
import { upload } from '../controllers/measure/upload';

export async function appRoutes(app: FastifyInstance) {
	app.post('/upload', upload);
	app.patch('/confirm', confirm);
	app.get('/:costumer_code/list', list);
}
