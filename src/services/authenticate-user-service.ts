import { Role, User } from '@prisma/client';
import axios from 'axios';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from '../repositories/users-repository';

interface GitHubAccessToken {
  access_token: string;
}

interface GitHubUserInfos {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface TokenAndAuthenticatedUser {
  token: string;
  user: User;
}

export class AuthenticateUserService {
  constructor(private userRepository: UsersRepository) {}

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

    const { id, name, email, avatar_url } = githubUserInfosResponse.data;

    let user = await this.userRepository.findBySocialId(id);

    if (!user) {
      user = await this.userRepository.create({
        social_id: id,
        name,
        email,
        avatar_url,
        role: Role.ADMIN,
        created_at: new Date(),
        last_access: new Date(),
      });
    } else {
      user = await this.userRepository.updateLastAccess(user.id);
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
