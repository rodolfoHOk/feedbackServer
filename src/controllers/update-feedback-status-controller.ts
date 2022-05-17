import { Feedback } from '@prisma/client';
import { Request, Response } from 'express';
import { ErrorTypes } from '../errors/error-types';
import { NotFoundError } from '../errors/not-found-error';
import { ProblemResponse } from '../errors/problem-response';
import { ValidationError } from '../errors/validation-error';
import { PrismaFeedbacksRepository } from '../repositories/prisma/prisma-feedbacks-repository';
import { UpdateFeedbackStatusService } from '../services/update-feedback-status-service';

interface UpdateFeedbackStatusRequest {
  status: string;
}

export class UpdateFeedbackStatusController {
  async handle(req: Request, res: Response<ProblemResponse | Feedback>) {
    const { id } = req.params;
    const { status } = req.body as UpdateFeedbackStatusRequest;

    const repository = new PrismaFeedbacksRepository();
    const updateFeedbackStatusService = new UpdateFeedbackStatusService(
      repository
    );

    try {
      const updatedFeedback = await updateFeedbackStatusService.execute({
        id,
        status,
      });

      res.status(200).json(updatedFeedback);
    } catch (err) {
      if (err instanceof NotFoundError) {
        res.status(404).json({
          type: ErrorTypes.RESOURCE_NOT_FOUND,
          title: 'Resource not found',
          detail: err.message,
          status: 404,
        });
      } else if (err instanceof ValidationError) {
        res.status(400).json({
          type: ErrorTypes.INVALID_DATA,
          title: 'Baq request',
          detail: err.message,
          status: 400,
        });
      }
    }
  }
}
