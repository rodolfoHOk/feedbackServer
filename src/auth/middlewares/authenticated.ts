import { Role } from '@prisma/client';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface Payload {
  sub: string;
  user: {
    id: string;
    name: string;
    role: Role;
  };
}

export function authenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res
      .status(401)
      .json({ error: 'token.invalid', status: 'Unauthorized' });
  }

  const [, token] = authToken.split(' ');

  try {
    const tokenPayload = verify(
      token,
      process.env.JWT_SECRET as string
    ) as Payload;

    const userRole = tokenPayload.user.role;

    if (userRole === Role.ADMIN) {
      return next();
    }

    return res
      .status(403)
      .json({ error: 'user.unauthorized', status: 'Forbidden' });
  } catch (err) {
    return res
      .status(401)
      .json({ error: 'token.expired', status: 'Unauthorized' });
  }
}
