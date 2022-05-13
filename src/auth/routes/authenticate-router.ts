import { Router } from 'express';
import { FacebookAuthenticateUserController } from '../controllers/facebook-authenticate-user-controller';
import { GetAuthenticatedUserInfosController } from '../controllers/get-autenticated-user-infos-controller';
import { GithubAuthenticateUserController } from '../controllers/github-authenticate-user-controller';
import { GoogleAuthenticateUserController } from '../controllers/google-authenticate-user-controller';
import { authenticated } from '../middlewares/authenticated';

export const authenticateRouter = Router();

authenticateRouter.post(
  '/github',
  new GithubAuthenticateUserController().handle
);

authenticateRouter.post(
  '/google',
  new GoogleAuthenticateUserController().handle
);

authenticateRouter.post(
  '/facebook',
  new FacebookAuthenticateUserController().handle
);

authenticateRouter.get(
  '/user-infos',
  authenticated,
  new GetAuthenticatedUserInfosController().handle
);
