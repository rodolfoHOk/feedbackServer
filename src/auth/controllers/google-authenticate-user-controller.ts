import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { GoogleProvider } from '../providers/google-provider';
import { AuthenticateUserService } from '../services/authenticate-user-service';

export class GoogleAuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body;

    const repository = new PrismaUsersRepository();
    const provider = new GoogleProvider();
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
