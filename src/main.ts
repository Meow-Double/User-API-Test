import express from 'express';
import cors from 'cors';
import { env, IS_DEV } from '@/shared/consts/env.js';
import swaggerDocs from '@/core/swagger.js';
import { logger } from '@/core/logger.js';
import { connectDB } from '@/core/prisma.js';

import { authRouter } from './modules/auth/auth.routes.js';
import { errorHandler } from './shared/middlewares/errorHandler.js';

async function main() {
  await connectDB();

  const app = express();
  const PORT = env.PORT;

  app.use(
    cors({
      credentials: true,
      origin: env.CORS_ORIGIN,
    }),
  );

  app.use(express.json());

  app.use('/api/auth', authRouter);

  app.use(errorHandler);

  app.listen(PORT, () => {
    logger.info(`Сервер успешно запущен на порту: ${PORT}`);
    if (IS_DEV) {
      swaggerDocs(app);
    }
  });
}

main();
