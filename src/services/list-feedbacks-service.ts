import { Feedback, FeedbackStatus } from '@prisma/client';
import { ValidationError } from '../errors/validation-error';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

export interface PagedFeedbacks {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  feedbacks: Feedback[];
}

export class ListFeedbacksService {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(
    page: number,
    size: number,
    status?: string
  ): Promise<PagedFeedbacks> {
    if (
      status &&
      status !== FeedbackStatus.PENDING &&
      status !== FeedbackStatus.REJECTED &&
      status !== FeedbackStatus.RESOLVED &&
      status !== FeedbackStatus.UNDER_ANALYSIS
    ) {
      throw new ValidationError('Invalid feedback status', 'status');
    }

    const totalItems = await this.feedbacksRepository.count(
      status ? (status as FeedbackStatus) : undefined
    );
    const totalPages = Math.ceil(totalItems / size);

    const feedbacks = await this.feedbacksRepository.findAll(
      page,
      size,
      status ? (status as FeedbackStatus) : undefined
    );

    return {
      totalItems,
      totalPages,
      currentPage: page,
      feedbacks,
    };
  }
}
