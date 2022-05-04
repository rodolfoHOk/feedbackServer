import {
  FeedbacksRepository,
  FeedbackCreateData,
} from '../feedbacks-repository';
import { prisma } from '../../prisma';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    const { type, comment, screenshot } = data;

    return await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }

  async findAll() {
    return await prisma.feedback.findMany();
  }
}
