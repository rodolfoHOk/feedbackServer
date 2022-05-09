import { UserCreateData, UsersRepository } from '../users-repository';
import { prisma } from '../../prisma';
import { User } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: UserCreateData) {
    const {
      github_id,
      login,
      name,
      avatar_url,
      role,
      created_at,
      last_access,
    } = data;

    return await prisma.user.create({
      data: {
        github_id,
        login,
        name,
        avatar_url,
        role,
        created_at,
        last_access,
      },
    });
  }

  async findByGithubId(githubId: number) {
    return await prisma.user.findFirst({
      where: {
        github_id: githubId,
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
