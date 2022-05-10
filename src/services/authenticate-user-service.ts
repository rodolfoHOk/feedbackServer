import { Role, User } from '@prisma/client';
import axios from 'axios';
import { sign } from 'jsonwebtoken';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository';

interface GitHubAccessToken {
  access_token: string;
}

interface GitHubUserInfos {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
}

export interface TokenAndAuthenticatedUser {
  token: string;
  user: User;
}

export class AuthenticateUserService {
  constructor(private prismaUserRepository: PrismaUsersRepository) {}

  async execute(code: string): Promise<TokenAndAuthenticatedUser> {
    const githubAccessTokenResponse = await axios.post<GitHubAccessToken>(
      process.env.GITHUB_TOKEN_URL as string,
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const githubUserInfosResponse = await axios.get<GitHubUserInfos>(
      process.env.GITHUB_USER_INFOS_URL as string,
      {
        headers: {
          authorization: `Bearer ${githubAccessTokenResponse.data.access_token}`,
        },
      }
    );

    const { id, login, name, avatar_url } = githubUserInfosResponse.data;

    let user = await this.prismaUserRepository.findByGithubId(id);

    if (!user) {
      user = await this.prismaUserRepository.create({
        github_id: id,
        login,
        name,
        avatar_url,
        role: Role.ADMIN,
        created_at: new Date(),
        last_access: new Date(),
      });
    } else {
      user = await this.prismaUserRepository.updateLastAccess(user.id);
    }

    const token = sign(
      {
        user: {
          id: user.id,
          name: user.name,
        },
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      token,
      user,
    };
  }
}
