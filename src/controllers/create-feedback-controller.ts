import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import { MailtrapNodemailerMailAdapter } from '../adapters/nodemailer/mailtrap-nodemailer-mail-adapter';
import { SendgridNodemailerMailAdapter } from '../adapters/nodemailer/sendgrid-nodemeiler-mail-adapter';
import { ErrorTypes } from '../errors/error-types';
import { ProblemResponse } from '../errors/problem-response';
import { ValidationError } from '../errors/validation-error';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedBackService } from '../services/submit-feedback-service';

export class CreateFeedbackController {
  async handle(req: Request, res: Response<ProblemResponse | Feedback>) {
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

      return res.status(201).json(feedback);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({
          type: ErrorTypes.INVALID_DATA,
          title: 'Bad Request',
          detail: err.message,
          status: 400,
          field: err.field,
        });
      }

      console.log(err);

      return res.status(500).json({
        type: ErrorTypes.INTERNAL_SERVER_ERROR,
        title: 'Internal Server Error',
        detail: 'Something went wrong',
        status: 500,
      });
    }
  }
}
