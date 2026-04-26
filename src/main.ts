import express from 'express';
import cors from 'cors';
import { CORS_ORIGIN, PORT } from '@/config/env.js';
import swaggerDocs from '@/core/swagger.js';
import { logger } from '@/core/logger.js';
import { connectDB } from '@/core/prisma.js';

connectDB();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: CORS_ORIGIN,
  }),
);

app.use(express.json());

app.listen(PORT, () => {
  logger.info(`Сервер успешно запущен на порту: ${PORT}`);
  swaggerDocs(app);
});
