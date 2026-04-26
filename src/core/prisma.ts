import { env } from '@/shared/consts/env.js';
import { PrismaClient } from '@prisma/generated/prisma/client.js';
import { logger } from './logger.js';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: env.POSTGRES_URI,
});

const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
  try {
    await prisma.$connect();
    logger.info('База данных успешно подключена');
  } catch (error) {
    logger.error(error, 'Ошибка подключения к баззе данных');
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connectDB, disconnectDB };
