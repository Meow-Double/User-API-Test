import { prisma } from '@/core/prisma.js';
import { Prisma, type User } from '@prisma/generated/prisma/client.js';

export class UserRepository {
  create(args: Prisma.UserCreateArgs): Promise<User> {
    return prisma.user.create(args);
  }
  firstFind(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return prisma.user.findFirst(args);
  }
}

export const userRepository = new UserRepository();
