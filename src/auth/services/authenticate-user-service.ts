import { Role, User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { UsersRepository } from '../../repositories/users-repository';
import { Provider, UserInfos } from '../providers/provider';

export interface TokenAndAuthenticatedUser {
  token: string;
  user: User;
}

export class AuthenticateUserService {
  constructor(
    private userRepository: UsersRepository,
    private provider: Provider
  ) {}

  async execute(code: string): Promise<TokenAndAuthenticatedUser> {
    const accessToken = await this.provider.getToken(code);

    const userInfos: UserInfos = await this.provider.getUserInfos(accessToken);
    let { id, name, email, avatar_url } = userInfos;
    if (!id) {
      id = 'social_id_not_informed';
    }

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.create({
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
          role: user.role,
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
