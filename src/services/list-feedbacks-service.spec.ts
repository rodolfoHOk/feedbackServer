import { Feedback } from '@prisma/client';
import { ListFeedbacksService } from './list-feedbacks-service';

const feedbackReturned: Feedback = {
  id: 'a1b2c3',
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
};

const findAllFeedbacksSpy = jest.fn().mockResolvedValue([feedbackReturned]);

const listFeedback = new ListFeedbacksService({
  create: async () => feedbackReturned,
  findAll: findAllFeedbacksSpy,
});

describe('List feedbacks', () => {
  it('should return a list of feedbacks', async () => {
    await expect(listFeedback.execute()).resolves.toStrictEqual([
      feedbackReturned,
    ]);

    expect(findAllFeedbacksSpy).toBeCalled();
  });
});
