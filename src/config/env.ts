import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV !== 'production';
export const CORS_ORIGIN = process.env.CORS_ORIGIN;
export const PINO_LOG_LEVEL = process.env.PINO_LOG_LEVEL || 'info';
export const POSTGRES_URI = process.env.POSTGRES_URI;
