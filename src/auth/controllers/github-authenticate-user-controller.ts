import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { GithubProvider } from '../providers/github-provider';
import { AuthenticateUserService } from '../services/authenticate-user-service';

export class GithubAuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const repository = new PrismaUsersRepository();
    const provider = new GithubProvider();
    const service = new AuthenticateUserService(repository, provider);

    try {
      const result = await service.execute(code);
      return res.json(result);
    } catch (err) {
      if (err instanceof Error) {
        return res.json({ error: err.message });
      }
      console.log(err);
    }
  }
}