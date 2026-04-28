import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateBody } from '@/shared/middlewares/validateBody.js';
import { authRegisterDto } from './dtos/authRegister.dto.js';
import { jwtAuth } from '@/shared/middlewares/jwtAuth.js';
import { authLoginDto } from './dtos/authLogin.dto.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterDto),
  authController.register.bind(authController),
);

authRouter.post('/login', validateBody(authLoginDto), authController.login.bind(authController));

authRouter.get('/me', jwtAuth, authController.me.bind(authController));

authRouter.get('/refresh', jwtAuth, authController.refresh.bind(authController));
