import { Router, Request, Response } from 'express';
import { authenticateRouter } from './auth/routes/autenticate-router';
import { CreateFeedbackController } from './controllers/create-feedback-controller';
import { ListFeedbacksController } from './controllers/list-feedbacks-controller';

export const routes = Router();

routes.get('/status', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
});

routes.use('/auth', authenticateRouter);

routes.get('/feedbacks', new ListFeedbacksController().handle);

routes.post('/feedbacks', new CreateFeedbackController().handle);
