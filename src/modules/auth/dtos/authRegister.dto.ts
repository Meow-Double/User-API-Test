import { z } from 'zod';

const fullNameRegex = /^[а-яёa-z\s'-]+$/i;

export const authRegisterDto = z.object({
  fullName: z
    .string()
    .trim()
    .min(8, 'ФИО должно содержать минимум 8 символов')
    .max(60, 'ФИО слишком длинное')
    .regex(fullNameRegex, 'ФИО должно содержать только буквы, пробелы, дефисы и апострофы')
    .refine(
      (val) => val.split(/\s+/).filter(Boolean).length >= 2,
      'Укажите как минимум Фамилию и Имя',
    )
    .transform((val) => val.replace(/\s+/g, ' ')),
  dateOfBirth: z.coerce
    .date()
    .refine((date) => date < new Date(), 'Дата рождения не может быть в будущем'),
  email: z.string().email('Некорректный email').trim().toLowerCase(),
  password: z.string().min(8, 'Пароль должен содержать минимум 8 символов').max(100),
});

export type RegisterBody = z.infer<typeof authRegisterDto>;
