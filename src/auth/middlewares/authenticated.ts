import { Role } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AuthProblemResponse } from '../errors/auth-problem-response';
import { AuthErrorTypes } from '../errors/auth-error-types';

interface TokenPayload {
  sub: string;
  user: {
    id: string;
    name: string;
    role: Role;
  };
}

export function authenticated(
  req: Request,
  res: Response<AuthProblemResponse>,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      type: AuthErrorTypes.AUTHENTICATION_ERROR,
      title: 'Unauthorized',
      detail: 'Authorization token not informed or invalid',
      status: 401,
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const tokenPayload = verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    const userRole = tokenPayload.user.role;

    if (userRole === Role.ADMIN) {
      return next();
    }

    return res.status(403).json({
      type: AuthErrorTypes.FORBIDDEN_ERROR,
      title: 'Forbidden',
      detail: 'User not have permission for this operation',
      status: 403,
    });
  } catch (err) {
    return res.status(401).json({
      type: AuthErrorTypes.AUTHENTICATION_ERROR,
      title: 'Unauthorized',
      detail: 'Authorization token expired',
      status: 401,
    });
  }
}
