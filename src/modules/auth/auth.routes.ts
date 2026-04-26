import { Router } from 'express';
import { authController } from './auth.controller.js';
import { validateBody } from '@/shared/middlewares/validateBody.js';
import { authRegisterDto } from './dtos/authRegister.dto.js';

export const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fullName, email, password, dateOfBirth]
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Иванов Иван Иванович"
 *                 minLength: 3
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: "SecurePass123!"
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 example: "1995-06-15"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     user:
 *                       type: object
 *                       properties:
 *                         id: { type: string }
 *                         email: { type: string }
 *       400:
 *         description: Ошибка валидации
 *       409:
 *         description: Email уже зарегистрирован
 */
authRouter.post(
  '/register',
  validateBody(authRegisterDto),
  authController.register.bind(authController),
);
