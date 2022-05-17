import { Feedback, FeedbackStatus } from '@prisma/client';
import { ListFeedbacksService, PagedFeedbacks } from './list-feedbacks-service';

const feedbackReturned: Feedback = {
  id: 'a1b2c3',
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
  status: FeedbackStatus.PENDING,
  created_at: new Date(),
  modified_at: null,
};

const pagedFeedbacks: PagedFeedbacks = {
  totalItems: 1,
  totalPages: 1,
  currentPage: 1,
  feedbacks: [feedbackReturned],
};

const findAllFeedbacksSpy = jest.fn().mockResolvedValue([feedbackReturned]);

const listFeedback = new ListFeedbacksService({
  create: async () => feedbackReturned,
  findAll: findAllFeedbacksSpy,
  count: async () => 1,
  findById: async () => feedbackReturned,
  updateStatus: async () => feedbackReturned,
});

describe('List feedbacks', () => {
  it('should return a paged list of feedbacks', async () => {
    await expect(listFeedback.execute(1, 20)).resolves.toStrictEqual(
      pagedFeedbacks
    );

    expect(findAllFeedbacksSpy).toBeCalled();
  });
});
