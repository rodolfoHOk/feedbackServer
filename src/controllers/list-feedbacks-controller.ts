import { Request, Response } from 'express';
import { ErrorTypes } from '../errors/error-types';
import { ProblemResponse } from '../errors/problem-response';
import { ValidationError } from '../errors/validation-error';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import {
  ListFeedbacksService,
  PagedFeedbacks,
} from '../services/list-feedbacks-service';

export class ListFeedbacksController {
  async handle(req: Request, res: Response<ProblemResponse | PagedFeedbacks>) {
    const { page, size, status } = req.query;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const listFeedbacksService = new ListFeedbacksService(
      prismaFeedbacksRepository
    );

    try {
      const feedbacks = await listFeedbacksService.execute(
        page ? parseInt(page as string) : 1,
        size ? parseInt(size as string) : 10,
        status ? (status as string) : undefined
      );

      res.status(200).json(feedbacks);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).json({
          type: ErrorTypes.INVALID_DATA,
          title: 'Baq request',
          detail: 'Invalid status informed',
          status: 400,
          field: 'status',
        });
      }
    }
  }
}
