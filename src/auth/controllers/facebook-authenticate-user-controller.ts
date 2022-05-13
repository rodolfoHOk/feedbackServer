import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { AuthProblemResponse } from '../errors/AuthProblemResponse';
import { FacebookProvider } from '../providers/facebook-provider';
import {
  AuthenticateUserService,
  TokenAndAuthenticatedUser,
} from '../services/authenticate-user-service';

export class FacebookAuthenticateUserController {
  async handle(
    req: Request,
    res: Response<AuthProblemResponse | TokenAndAuthenticatedUser>
  ) {
    const { code } = req.body;

    const repository = new PrismaUsersRepository();
    const provider = new FacebookProvider();
    const service = new AuthenticateUserService(repository, provider);

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        return res.json({
          error: err.message,
          status: 'Internal Server Error',
        });
      }
      console.log(err);
    }
  }
}
