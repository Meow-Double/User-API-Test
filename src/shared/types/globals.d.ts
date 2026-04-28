/// <reference types="express" />

import type { JwtType } from '@/core/jwt.service.ts';
import type { UserRoles } from '@prisma/generated/prisma/index.js';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: JwtType['userId'];
        role: UserRoles;
      };
    }
  }
}
