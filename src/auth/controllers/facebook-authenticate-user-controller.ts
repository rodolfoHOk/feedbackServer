import { Request, Response } from 'express';
import { ProblemResponse } from '../../errors/problem-response';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { FacebookProvider } from '../providers/facebook-provider';
import {
  AuthenticateUserService,
  TokenAndAuthenticatedUser,
} from '../services/authenticate-user-service';

export class FacebookAuthenticateUserController {
  async handle(
    req: Request,
    res: Response<ProblemResponse | TokenAndAuthenticatedUser>
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
