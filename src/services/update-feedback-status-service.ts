import { Feedback, FeedbackStatus } from '@prisma/client';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface UpdateFeedbackStatusRequest {
  id: string;
  status: string;
}

export class UpdateFeedbackStatusService {
  constructor(private feedbackRepository: FeedbacksRepository) {}

  async execute({
    id,
    status,
  }: UpdateFeedbackStatusRequest): Promise<Feedback> {
    const findedFeedback = this.feedbackRepository.findById(id);

    if (!findedFeedback) {
      throw new NotFoundError('Feedback not found with informed id');
    }

    if (
      status !== FeedbackStatus.PENDING &&
      status !== FeedbackStatus.REJECTED &&
      status !== FeedbackStatus.RESOLVED &&
      status !== FeedbackStatus.UNDER_ANALYSIS
    ) {
      throw new ValidationError('Invalid feedback status', 'status');
    }

    return this.feedbackRepository.updateStatus(id, status);
  }
}
