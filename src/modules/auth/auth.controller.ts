import type { Request, Response } from 'express';
import type { RegisterBody } from './dtos/authRegister.dto.js';

import { IS_PROD } from '@/shared/consts/env.js';
import { authService } from './auth.service.js';
import type { LoginBody } from './dtos/authLogin.dto.js';

class AuthController {
  public async register(req: Request, res: Response) {
    const body: RegisterBody = req.body;
    const { accessToken, createdUser, refreshToken } = await authService.register(body);

    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(201).json({
      success: true,
      message: 'Пользователь успешно зарегестрировался',
      data: { accessToken, user: { id: createdUser.id, email: createdUser.email } },
    });
  }

  public async login(req: Request, res: Response) {
    const body: LoginBody = req.body;
    const { accessToken, user, refreshToken } = await authService.login(body);

    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(201).json({
      success: true,
      message: 'Пользователь успешно авторизовался',
      data: { accessToken, user: { id: user.id, email: user.email } },
    });
  }

  public async me(req: Request, res: Response) {
    const userId = req.user.id;

    const user = await authService.me(userId);

    return res.status(201).json({
      success: true,
      user,
    });
  }

  public async refresh(req: Request, res: Response) {
    const userId = req.user.id;

    const { accessToken, refreshToken } = await authService.refresh(userId);

    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: 'lax',
      path: '/',
    });

    return res.status(201).json({
      success: true,
      token: accessToken,
    });
  }
}

export const authController = new AuthController();
