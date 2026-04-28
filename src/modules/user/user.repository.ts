import { prisma } from '@/core/prisma.js';
import { Prisma, type User } from '@prisma/generated/prisma/client.js';

export class UserRepository {
  create(args: Prisma.UserCreateArgs): Promise<User> {
    return prisma.user.create(args);
  }
  firstFind(args: Prisma.UserFindFirstArgs): Promise<User | null> {
    return prisma.user.findFirst(args);
  }
  findMany(args: Prisma.UserFindManyArgs): Promise<User[] | null> {
    return prisma.user.findMany(args);
  }
  update(args: Prisma.UserUpdateArgs): Promise<User | null> {
    return prisma.user.update(args);
  }
  userCount(): Promise<number> {
    return prisma.user.count();
  }
}

export const userRepository = new UserRepository();
