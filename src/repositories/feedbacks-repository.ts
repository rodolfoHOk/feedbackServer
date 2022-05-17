import { Feedback, FeedbackStatus } from '@prisma/client';

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<Feedback>;
  findAll: (page: number, size: number) => Promise<Feedback[]>;
  count: () => Promise<number>;
  findById: (id: string) => Promise<Feedback | null>;
  updateStatus: (id: string, status: FeedbackStatus) => Promise<Feedback>;
}
