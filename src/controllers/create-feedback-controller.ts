import { Request, Response } from 'express';
import { MailtrapNodemailerMailAdapter } from '../adapters/nodemailer/mailtrap-nodemailer-mail-adapter';
import { SendgridNodemailerMailAdapter } from '../adapters/nodemailer/sendgrid-nodemeiler-mail-adapter';
import { ValidationError } from '../errors/validation-error';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedBackService } from '../services/submit-feedback-service';

export class CreateFeedbackController {
  async handle(req: Request, res: Response) {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const nodemailerMailAdapter =
      process.env.NODE_ENV === 'production'
        ? new SendgridNodemailerMailAdapter()
        : new MailtrapNodemailerMailAdapter();
    const submitFeedBackService = new SubmitFeedBackService(
      prismaFeedbacksRepository,
      nodemailerMailAdapter
    );

    try {
      const feedback = await submitFeedBackService.execute({
        type,
        comment,
        screenshot,
      });

      return res.status(201).json({ data: feedback });
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          error: err.message,
          status: 'Bad Request',
          field: err.field,
        });
      }

      console.log(err);

      return res.status(500).json({
        error: 'Something went wrong',
        status: 'Internal Server Error',
      });
    }
  }
}
