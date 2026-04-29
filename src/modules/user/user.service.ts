import { userRepository } from './user.repository.js';
import bcrypt from 'bcrypt';
import type { CreateUserInput } from './types/user.types.js';
import { BadRequestError, ForbiddenError, NotFoundError } from '@/core/http.error.js';
import { UserRoles, UserStatus } from '@prisma/generated/prisma/index.js';
import { logger } from '@/core/logger.js';

export class UserService {
  async createUser(input: CreateUserInput) {
    const { password, ...otherData } = input;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
      data: {
        ...otherData,
        password: passwordHash,
      },
    });

    return user;
  }

  async findUser(data: { email?: string; id?: string }, withPassword: boolean = false) {
    if (!data.email && !data.id) {
      throw new BadRequestError('Отсуствует email и id');
    }

    const user = await userRepository.firstFind({
      where: { ...data },
      select: {
        id: true,
        fullName: true,
        email: true,
        dateOfBirth: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        password: withPassword,
      },
    });

    return user;
  }

  async findUserById(targetId: string, requesterId: string, requesterRole: UserRoles) {
    if (requesterRole !== UserRoles.ADMIN && requesterId !== targetId) {
      throw new ForbiddenError('Нет прав для просмотра этого профиля');
    }

    const user = await userRepository.firstFind({
      where: { id: targetId },
      select: {
        id: true,
        fullName: true,
        email: true,
        dateOfBirth: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError(`Пользователь не найден, ${targetId}`);
    }

    return user;
  }

  async getUsers(requesterRole: UserRoles, page: number = 1, limit: number = 20) {
    if (requesterRole !== UserRoles.ADMIN) {
      throw new ForbiddenError('У вас недостаточно прав');
    }

    const safePage = Math.max(1, Math.floor(page));
    const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 100);
    const skip = (safePage - 1) * safeLimit;

    const [list, total] = await Promise.all([
      userRepository.findMany({
        skip,
        take: safeLimit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          fullName: true,
          email: true,
          dateOfBirth: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      userRepository.userCount(),
    ]);

    return { data: list, meta: { total } };
  }

  async userBlock(targetId: string, requesterId: string, requesterRole: UserRoles) {
    if (requesterRole !== UserRoles.ADMIN && requesterId !== targetId) {
      throw new ForbiddenError('У вас недостаточно прав');
    }

    const user = await this.findUser({ id: targetId });

    if (!user) {
      throw new NotFoundError(`Пользователь не найден, ${targetId}`);
    }

    if (user.status === UserStatus.BLOCKED) {
      return { status: 'success', message: 'Данный аккаунт уже заблокирован' };
    }

    const id = await userRepository.update({
      where: { id: targetId },
      data: { status: 'BLOCKED' },
      select: { id: true },
    });

    logger.info({ id }, `Пользователь был заблокирован`);
    return { status: 'success', message: 'Пользователь успешно заблокирован' };
  }
}

export const userService = new UserService();
