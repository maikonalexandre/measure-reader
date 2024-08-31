import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
	PORT: z.coerce.number().default(3333),
	SERVER_BASE_URL: z.string().url().default('http://localhost:80'),
	GEMINI_API_KEY: z.string(),
	HOST: z.string().default('0.0.0.0'),
	GEMINI_MAX_RETRIES: z.number().default(1),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('❌ Invalid environment variables', _env.error.format());
	throw new Error('Invalid environment variables');
}

export const env = _env.data;

