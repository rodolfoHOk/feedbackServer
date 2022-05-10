import { Router } from 'express';
import { FacebookAuthenticateUserController } from '../controllers/facebook-authenticate-user-controller';
import { GithubAuthenticateUserController } from '../controllers/github-authenticate-user-controller';
import { GoogleAuthenticateUserController } from '../controllers/google-authenticate-user-controller';

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
