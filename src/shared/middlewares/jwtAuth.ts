import { UnauthorizedError } from '@/core/http.error.js';
import { jwtService } from '@/core/jwt.service.js';
import type { NextFunction, Request, Response } from 'express';

export const jwtAuth = (req: Request, _: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Необходима авторизация (Bearer token)');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Необходима авторизация (Bearer token)');
    }

    const payload = jwtService.verifyAccess(token);

    req.userId = payload.userId;

    next();
  } catch (error) {
    next(error);
  }
};
