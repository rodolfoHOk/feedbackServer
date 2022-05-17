import { Router, Request, Response } from 'express';
import { authenticated } from './auth/middlewares/authenticated';
import { authenticateRouter } from './auth/routes/authenticate-router';
import { CreateFeedbackController } from './controllers/create-feedback-controller';
import { ListFeedbacksController } from './controllers/list-feedbacks-controller';
import { UpdateFeedbackStatusController } from './controllers/update-feedback-status-controller';

export const routes = Router();

routes.get('/status', (req: Request, res: Response) => {
  return res.status(200).json({ status: 'ok' });
});

routes.use('/auth', authenticateRouter);

routes.post('/feedbacks', new CreateFeedbackController().handle);

routes.get('/feedbacks', authenticated, new ListFeedbacksController().handle);

routes.put('/feedbacks/:id', new UpdateFeedbackStatusController().handle);
