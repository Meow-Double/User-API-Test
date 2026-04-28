import { env } from '@/shared/consts/env.js';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from './http.error.js';
import type { UserRoles } from '@prisma/generated/prisma/index.js';

export interface JwtType extends jwt.JwtPayload {
  userId: string;
  userRole: UserRoles;
}

export class JwtService {
  public generateAccessToken(data: { userId: string; role: UserRoles }) {
    const token = jwt.sign(
      {
        ...data,
      },
      env.JWT_ACCESS_SECRET,
      {
        expiresIn: '10d',
      },
    );

    return token;
  }

  public generateRefreshToken(userId: string) {
    const token = jwt.sign(
      {
        userId,
      },
      env.JWT_REFRESH_SECRET,
      {
        expiresIn: '10d',
      },
    );

    return token;
  }

  public verifyAccess(token: string): JwtType {
    try {
      const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

      if (this.isJwtPayload(decoded)) {
        return decoded;
      }

      throw new UnauthorizedError('Невалидная структура токена');
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Срок действия токена истёк');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Невалидный токен или подпись');
      }

      throw error;
    }
  }

  private isJwtPayload(payload: unknown): payload is JwtType {
    return typeof payload === 'object' && payload !== null && 'userId' in payload;
  }
}

export const jwtService = new JwtService();
