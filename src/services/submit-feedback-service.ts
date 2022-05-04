import { Feedback } from '@prisma/client';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedBackRequest {
  type: string;
  comment: string;
  screenshot: string;
}

export class SubmitFeedBackService {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(request: SubmitFeedBackRequest): Promise<Feedback> {
    const { type, comment, screenshot } = request;

    return await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });
  }
}
