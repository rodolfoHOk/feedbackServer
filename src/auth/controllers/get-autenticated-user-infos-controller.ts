import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { AuthErrorTypes } from '../errors/auth-error-types';
import { AuthProblemResponse } from '../errors/auth-problem-response';
import { GetAuthenticatedUserInfosService } from '../services/get-authenticated-user-infos-service';

export class GetAuthenticatedUserInfosController {
  async handle(req: Request, res: Response<AuthProblemResponse | User>) {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        type: AuthErrorTypes.AUTHENTICATION_ERROR,
        title: 'Unauthorized',
        detail: 'Authorization token not informed',
        status: 401,
      });
    }

    const prismaUsersRepository = new PrismaUsersRepository();
    const getAuthenticatedUserInfosService =
      new GetAuthenticatedUserInfosService(prismaUsersRepository);

    const user = await getAuthenticatedUserInfosService.execute(token);

    if (!user) {
      return res.status(404).json({
        type: AuthErrorTypes.RESOURCE_NOT_FOUND,
        title: 'Resource Not Found',
        detail: 'User infos not found',
        status: 404,
      });
    }

    return res.status(200).json(user);
  }
}
