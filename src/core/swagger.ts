import type { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import pkg from '@/../package.json' with { type: 'json' };
import { logger } from './logger.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: pkg.version,
    },
    tags: [
      { name: 'Auth', description: 'Регистрация и авторизация' },
      { name: 'Users', description: 'Управление пользователями' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Введите access token в формате: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`',
        },
      },
    },
  },
  apis: ['./src/modules/**/*.doc.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  logger.info(`Swagger успешно запущен по маршруту /docs`);

  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
