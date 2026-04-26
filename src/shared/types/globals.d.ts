/// <reference types="express" />

import type { JwtType } from '@/core/jwt.service.ts';

declare global {
  namespace Express {
    interface Request {
      userId?: JwtType['userId'];
    }
  }
}
