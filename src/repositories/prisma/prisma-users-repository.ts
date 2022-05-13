import { UserCreateData, UsersRepository } from '../users-repository';
import { prisma } from '../../prisma';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData) {
    const { name, email, avatar_url, role, created_at, last_access } = data;

    return await prisma.user.create({
      data: {
        name,
        email,
        avatar_url,
        role,
        created_at,
        last_access,
      },
    });
  }

  async findById(id: string) {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async updateLastAccess(id: string) {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        last_access: new Date(),
      },
    });
  }
}
