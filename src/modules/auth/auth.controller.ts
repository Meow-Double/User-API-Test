import type { Request, Response } from 'express';
import type { RegisterBody } from './dtos/authRegister.dto.js';

import { IS_PROD } from '@/shared/consts/env.js';
import { authService } from './auth.service.js';

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
      message: 'User registered',
      data: { accessToken, user: { id: createdUser.id, email: createdUser.email } },
    });
  }
}

export const authController = new AuthController();
