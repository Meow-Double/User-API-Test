import { HttpError } from '@/core/http.error.js';
import { logger } from '@/core/logger.js';
import type { NextFunction, Request, Response } from 'express';
import { ERROR_STATUS } from '../consts/error-status.js';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    logger.warn(
      {
        path: req.path,
        method: req.method,
        message: err.message,
      },
      `HTTP Error ${err.statusCode}`,
    );
    return res.status(err.statusCode).json(err.toJson());
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

  res.status(ERROR_STATUS.INTERNAL_ERROR).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'Внутренняя ошибка сервера',
    },
  });

  next(err);
};
