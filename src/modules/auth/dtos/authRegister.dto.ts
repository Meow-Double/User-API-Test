import { z } from 'zod';

export const authRegisterDto = z.object({
  fullName: z.string().trim().min(3, 'ФИО должно содержать минимум 3 символа').max(100),
  dateOfBirth: z.coerce
    .date()
    .refine((date) => date < new Date(), 'Дата рождения не может быть в будущем'),
  email: z.string().email('Некорректный email').trim().toLowerCase(),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов').max(100),
});

export type RegisterBody = z.infer<typeof authRegisterDto>;
