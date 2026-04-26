import { env } from '@/shared/consts/env.js';
import jwt from 'jsonwebtoken';

export class JwtService {
  public generateAccessToken(userId: string) {
    const token = jwt.sign(
      {
        userId,
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
}

export const jwtService = new JwtService();
