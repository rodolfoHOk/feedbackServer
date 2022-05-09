import express, { Request } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { ListFeedbacksService } from './services/list-feedbacks-service';
import { SubmitFeedBackService } from './services/submit-feedback-service';

export const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.status(200).send('ok');
});

routes.get('/feedbacks', async (req, res) => {
  const { page, size } = req.query;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const listFeedbacksService = new ListFeedbacksService(
    prismaFeedbacksRepository
  );

  const feedbacks = await listFeedbacksService.execute(
    page ? parseInt(page as string) : 1,
    size ? parseInt(size as string) : 10
  );

  res.status(200).send({ data: feedbacks });
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedBackService = new SubmitFeedBackService(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  const feedback = await submitFeedBackService.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send({ data: feedback });
});
