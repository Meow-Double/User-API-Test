import type { NextFunction, Request, Response } from 'express';
import { z, type ZodSchema } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.error) {
      const errorTree = z.treeifyError(result.error);

      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        ...errorTree,
      });
    }

    req.body = result.data;
    next();
  };
};
