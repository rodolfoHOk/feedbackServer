import express from 'express';
// import nodemailer from 'nodemailer';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { ListFeedbacksService } from './services/list-feedbacks-service';
import { SubmitFeedBackService } from './services/submit-feedback-service';

// const transport = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: '6e7dcbabb39c2d',
//     pass: 'a2b44f941ab81e',
//   },
// });

export const routes = express.Router();

routes.get('/status', (req, res) => {
  return res.status(200).send('ok');
});

routes.get('/feedbacks', async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const listFeedbacksService = new ListFeedbacksService(
    prismaFeedbacksRepository
  );

  const feedbacks = await listFeedbacksService.execute();

  res.status(200).send({ data: feedbacks });
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedBackService = new SubmitFeedBackService(
    prismaFeedbacksRepository
  );

  const feedback = await submitFeedBackService.execute({
    type,
    comment,
    screenshot,
  });

  // transport.sendMail({
  //   from: 'Equipe FeedGet <oi@feedget.com>',
  //   to: 'FeedGet Rudy <testes.dev.hiok@gmail.com>',
  //   subject: 'Novo feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n'),
  // });

  return res.status(201).send({ data: feedback });
});
