export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  INTERNAL: 500,
};

export const ERROR_CODES = {
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
} as const;

export const ERROR_MESSAGES = {
  [ERROR_CODES.USER_ALREADY_EXISTS]: 'Пользователь с таким email уже зарегистрирован',
  [ERROR_CODES.USER_NOT_FOUND]: 'Пользователь не найден',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Неверный email или пароль',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Срок действия токена истёк',
} as const;
