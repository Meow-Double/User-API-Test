import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from '@/shared/consts/errors.js';
import { HttpError } from './http.error.js';

export class ConflictError extends HttpError {
  constructor(
    message = ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS],
    details?: Record<string, unknown>,
  ) {
    super(HTTP_STATUS.CONFLICT, ERROR_CODES.USER_ALREADY_EXISTS, message, details);
    this.name = 'ConflictError';
  }
}

export class NotFoundError extends HttpError {
  constructor(resource: string, id: string) {
    const message = `${resource} с id "${id}" не найден`;
    super(HTTP_STATUS.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND, message, { resource, id });
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = ERROR_MESSAGES[ERROR_CODES.INVALID_CREDENTIALS]) {
    super(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.INVALID_CREDENTIALS, message);
    this.name = 'UnauthorizedError';
  }
}
