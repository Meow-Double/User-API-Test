import { z } from 'zod';

export const authLoginDto = z.object({
  email: z.string().email('Некорректный email').trim().toLowerCase(),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов').max(100),
});

export type LoginBody = z.infer<typeof authLoginDto>;
