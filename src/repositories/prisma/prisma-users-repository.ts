import { UserCreateData, UsersRepository } from '../users-repository';
import { prisma } from '../../prisma';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData) {
    const {
      social_id,
      name,
      email,
      avatar_url,
      role,
      created_at,
      last_access,
    } = data;

    return await prisma.user.create({
      data: {
        social_id,
        name,
        email,
        avatar_url,
        role,
        created_at,
        last_access,
      },
    });
  }

  async findBySocialId(socialId: string) {
    return await prisma.user.findFirst({
      where: {
        social_id: socialId,
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
