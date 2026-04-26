import { jwtService } from '@/core/jwt.service.js';
import { userService } from '../user/user.service.js';
import type { RegisterBody } from './dtos/authRegister.dto.js';
import { logger } from '@/core/logger.js';

import type { LoginBody } from './dtos/authLogin.dto.js';
import bcrypt from 'bcrypt';
import { ConflictError, NotFoundError, UnauthorizedError } from '@/core/http.error.js';

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

  async login(input: LoginBody) {
    const { email, password } = input;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Неверный email или пароль');
    }

    const isValidPSW = await bcrypt.compare(password, user.password);

    if (!isValidPSW) {
      throw new UnauthorizedError('Неверный email или пароль');
    }

    const accessToken = jwtService.generateAccessToken(user.id);
    const refreshToken = jwtService.generateRefreshToken(user.id);

    logger.info({ id: user.id }, `Пользователь ${user.fullName} успещно авторизовался`);

    return { accessToken, refreshToken, user };
  }

  async me(userId?: string) {
    if (!userId) {
      throw new UnauthorizedError('Необходима авторизация (Bearer token)');
    }

    const user = await userService.findUserById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь отсуствует');
    }

    return user;
  }

  async refresh(userId?: string) {
    if (!userId) {
      throw new UnauthorizedError('Необходима авторизация (Bearer token)');
    }

    const user = await userService.findUserById(userId);

    if (!user) {
      throw new NotFoundError('Пользователь отсуствует');
    }

    const accessToken = jwtService.generateAccessToken(user.id);
    const refreshToken = jwtService.generateRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
