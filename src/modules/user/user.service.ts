import { userRepository } from './user.repository.js';
import bcrypt from 'bcrypt';
import type { CreateUserInput } from './user.types.js';

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

  async findUserByEmail(email: string) {
    return await userRepository.firstFind({
      where: { email },
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
  }

  async findUserById(userId: string) {
    return await userRepository.firstFind({
      where: { id: userId },
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
  }
}

export const userService = new UserService();
