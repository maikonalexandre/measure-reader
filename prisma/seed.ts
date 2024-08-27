import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	await prisma.measure.create({
		data: {
			customer_code: 'customer_code',
			datetime: new Date(),
			has_confirmed: true,
			image_url: 'imgurl',
			type: 'GAS',
		},
	});
}

seed();
