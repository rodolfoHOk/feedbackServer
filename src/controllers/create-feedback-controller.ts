import { Request, Response } from 'express';
import { NodemailerMailAdapter } from '../adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedBackService } from '../services/submit-feedback-service';

export class CreateFeedbackController {
  async handle(req: Request, res: Response) {
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
  }
}
