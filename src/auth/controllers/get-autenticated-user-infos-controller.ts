import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { AuthProblemResponse } from '../errors/AuthProblemResponse';
import { GetAuthenticatedUserInfosService } from '../services/get-authenticated-user-infos-service';

export class GetAuthenticatedUserInfosController {
  async handle(req: Request, res: Response<AuthProblemResponse | User>) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({
        error: 'Authorization token not informed',
        status: 'Baq Request',
      });
    }

    const prismaUsersRepository = new PrismaUsersRepository();
    const getAuthenticatedUserInfosService =
      new GetAuthenticatedUserInfosService(prismaUsersRepository);

    const user = await getAuthenticatedUserInfosService.execute(token);

    if (!user) {
      return res.status(404).json({
        error: 'User infos not found',
        status: 'Not Found',
      });
    }

    return res.status(200).json(user);
  }
}
