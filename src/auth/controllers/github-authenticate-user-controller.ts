import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { AuthErrorTypes } from '../errors/auth-error-types';
import { AuthProblemResponse } from '../errors/auth-problem-response';
import { GithubProvider } from '../providers/github-provider';
import {
  AuthenticateUserService,
  TokenAndAuthenticatedUser,
} from '../services/authenticate-user-service';

export class GithubAuthenticateUserController {
  async handle(
    req: Request,
    res: Response<AuthProblemResponse | TokenAndAuthenticatedUser>
  ) {
    const { code } = req.body;

    const repository = new PrismaUsersRepository();
    const provider = new GithubProvider();
    const service = new AuthenticateUserService(repository, provider);

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(502).json({
          type: AuthErrorTypes.AUTHENTICATION_ERROR,
          title: 'Bad Gateway',
          status: 502,
          detail: err.message,
        });
      }
      console.log(err);
    }
  }
}
