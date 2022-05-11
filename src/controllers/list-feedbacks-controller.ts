import { Request, Response } from 'express';
import { ProblemResponse } from '../errors/problem-response';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import {
  ListFeedbacksService,
  PagedFeedbacks,
} from '../services/list-feedbacks-service';

export class ListFeedbacksController {
  async handle(req: Request, res: Response<ProblemResponse | PagedFeedbacks>) {
    const { page, size } = req.query;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const listFeedbacksService = new ListFeedbacksService(
      prismaFeedbacksRepository
    );

    const feedbacks = await listFeedbacksService.execute(
      page ? parseInt(page as string) : 1,
      size ? parseInt(size as string) : 10
    );

    res.status(200).json(feedbacks);
  }
}
