import { jwtService } from '@/core/jwt/jwt.service.js';
import { userService } from '../user/user.service.js';
import type { RegisterBody } from './dtos/authRegister.dto.js';
import { logger } from '@/core/logger.js';
import { ConflictError } from '@/core/error/index.js';

export class AuthService {
  async register(input: RegisterBody) {
    const existingUser = await userService.findUserByEmail(input.email);

    if (existingUser) {
      throw new ConflictError('Пользователь с таким email уже зарегистрирован');
    }

    const createdUser = await userService.createUser(input);
    logger.info(
      { id: createdUser.id },
      `Пользователь ${createdUser.fullName} успещно зарегестрировался`,
    );

    const accessToken = jwtService.generateAccessToken(createdUser.id);
    const refreshToken = jwtService.generateRefreshToken(createdUser.id);

    return { createdUser, accessToken, refreshToken };
  }
}

export const authService = new AuthService();
