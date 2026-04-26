import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().min(1024).max(65535).default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CORS_ORIGIN: z.string().optional(),
  PINO_LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  POSTGRES_URI: z.string().url('POSTGRES_URI должен быть валидным URL'),

  JWT_ACCESS_SECRET: z.string().min(4, 'JWT_ACCESS_SECRET должен быть >= 4символов'),
  JWT_ACCESS_EXPIRES: z.string().default('15m'),
  JWT_REFRESH_SECRET: z.string().min(4, 'JWT_REFRESH_SECRET должен быть >= 4 символов'),
  JWT_REFRESH_EXPIRES: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);

export const IS_DEV = env.NODE_ENV === 'development';
export const IS_PROD = env.NODE_ENV === 'production';
