import { Feedback } from '@prisma/client';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

export interface PagedFeedbacks {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  feedbacks: Feedback[];
}

export class ListFeedbacksService {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(page: number, size: number): Promise<PagedFeedbacks> {
    const totalItems = await this.feedbacksRepository.count();
    const totalPages = Math.ceil(totalItems / size);
    const feedbacks = await this.feedbacksRepository.findAll(page, size);

    return {
      totalItems,
      totalPages,
      currentPage: page,
      feedbacks,
    };
  }
}
