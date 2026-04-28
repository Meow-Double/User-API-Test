import type { Request, Response } from 'express';
import { userService } from './user.service.js';

class UserController {
  public async getUserById(req: Request<{ id: string }>, res: Response) {
    const { id: targetId } = req.params;

    const userId = req.user.id;
    const userRole = req.user.role;
    const user = await userService.findUserById(targetId, userId, userRole);

    return res.json(user);
  }

  public async getUsers(req: Request, res: Response) {
    const userRole = req.user.role;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const users = await userService.getUsers(userRole, page, limit);

    return res.json(users);
  }

  public async userBlock(req: Request<{ id: string }>, res: Response) {
    const { id: targetId } = req.params;

    const userId = req.user.id;
    const userRole = req.user.role;

    const answer = await userService.userBlock(targetId, userId, userRole);

    return res.json(answer);
  }
}

export const userController = new UserController();
