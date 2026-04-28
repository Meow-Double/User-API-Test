import { jwtAuth } from '@/shared/middlewares/jwtAuth.js';
import { Router } from 'express';
import { userController } from './user.controller.js';

export const userRouter = Router();

userRouter.get('/', jwtAuth, userController.getUsers.bind(userController));

userRouter.get('/:id', jwtAuth, userController.getUserById.bind(userController));

userRouter.post('/:id/block', jwtAuth, userController.userBlock.bind(userController));
