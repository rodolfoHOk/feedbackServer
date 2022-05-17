import {
  FeedbacksRepository,
  FeedbackCreateData,
} from '../feedbacks-repository';
import { prisma } from '../../prisma';
import { Feedback, FeedbackStatus } from '@prisma/client';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create(data: FeedbackCreateData) {
    const { type, comment, screenshot } = data;

    return await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
        status: FeedbackStatus.PENDING,
        created_at: new Date(),
      },
    });
  }

  async findAll(page: number, size: number) {
    const skip = Math.floor((page - 1) * size);

    return await prisma.feedback.findMany({
      skip,
      take: size,
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  async count() {
    return await prisma.feedback.count();
  }

  async findById(id: string) {
    return await prisma.feedback.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateStatus(id: string, status: FeedbackStatus) {
    return await prisma.feedback.update({
      where: {
        id: id,
      },
      data: {
        status: status,
        modified_at: new Date(),
      },
    });
  }
}
