import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	await prisma.measure.create({
		data: {
			customer_code: 'customer_code',
			measure_datetime: new Date(),
			has_confirmed: true,
			image_address: 'imgURL',
			measure_type: 'GAS',
			measure_value: 102,
		},
	});
}

seed();
