import { ERROR_STATUS } from '@/shared/consts/error-status.js';
export class HttpError extends Error {
  public constructor(
    public readonly statusCode: number,
    public readonly message: string,
  ) {
    super(message);
  }

  toJson() {
    return {
      success: false,
      error: {
        statusCode: this.statusCode,
        message: this.message,
      },
    };
  }
}

export class ConflictError extends HttpError {
  constructor(public message: string) {
    super(ERROR_STATUS.CONFLICT_ERROR, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(public message: string) {
    super(ERROR_STATUS.UNAUTHORIZED_ERROR, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(public message: string) {
    super(ERROR_STATUS.NOT_FOUND_ERROR, message);
  }
}

export class BadRequestError extends HttpError {
  constructor(public message: string) {
    super(ERROR_STATUS.BAD_REQUEST_ERROR, message);
  }
}
export class ForbiddenError extends HttpError {
  constructor(public message: string) {
    super(ERROR_STATUS.BAD_REQUEST_ERROR, message);
  }
}
