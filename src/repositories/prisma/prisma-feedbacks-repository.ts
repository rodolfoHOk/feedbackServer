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

  async findAll(page: number, size: number) {
    const skip = Math.floor((page - 1) * size);

    return await prisma.feedback.findMany({
      skip,
      take: size,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async count() {
    return await prisma.feedback.count({
      orderBy: {
        id: 'desc',
      },
    });
  }
}
