import type { ErrorRequestHandler } from 'express';
import type { Request, Response } from 'express';
import { logger } from '@/core/logger.js';
import { HttpError } from '@/core/error/http.error.js';
import { HTTP_STATUS } from '../consts/errors.js';

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response) => {
  if (err instanceof HttpError) {
    logger.warn(
      {
        path: req.path,
        method: req.method,
        code: err.code,
        details: err.details,
      },
      `HTTP Error ${err.statusCode}`,
    );
    return res.status(err.statusCode).json(err.toJSON());
  }

  logger.error(
    {
      path: req.path,
      method: req.method,
      error: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    },
    'Unhandled error',
  );

  return res.status(HTTP_STATUS.INTERNAL).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Внутренняя ошибка сервера',
    },
  });
};
