import { UsersRepository } from '../../repositories/users-repository';
import jsonWebToken from 'jsonwebtoken';
import { Role } from '@prisma/client';

interface TokenPayload {
  sub: string;
  user: {
    id: string;
    name: string;
    role: Role;
  };
}

export class GetAuthenticatedUserInfosService {
  constructor(private userRepository: UsersRepository) {}

  async execute(bearerToken: string) {
    const [, token] = bearerToken.split(' ');

    const tokenPayload = jsonWebToken.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    const userId = tokenPayload.user.id;

    return await this.userRepository.findById(userId);
  }
}
