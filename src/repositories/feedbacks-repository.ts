import { Feedback } from '@prisma/client';

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<Feedback>;
  findAll: (page: number, size: number) => Promise<Feedback[]>;
  count: () => Promise<number>;
}
