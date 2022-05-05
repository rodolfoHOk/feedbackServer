import { Feedback } from '@prisma/client';
import {
  SubmitFeedBackRequest,
  SubmitFeedBackService,
} from './submit-feedback-service';

const feedbackReturned: Feedback = {
  id: 'a1b2c3',
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
};

const createFeedbackSpy = jest.fn().mockResolvedValue(feedbackReturned);
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedBackService(
  {
    create: createFeedbackSpy,
    findAll: async () => [feedbackReturned],
  },
  { sendMail: sendMailSpy }
);

const feedbackValidInput: SubmitFeedBackRequest = {
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
};

describe('Submit feedback', () => {
  it('should be able to submit feedback', async () => {
    await expect(
      submitFeedback.execute(feedbackValidInput)
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should return a feedback when a valid submit feedback is informed', async () => {
    await expect(submitFeedback.execute(feedbackValidInput)).resolves.toBe(
      feedbackReturned
    );
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,anyWhere',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,anyWhere',
      })
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with a invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'anyWhere.jpg',
      })
    ).rejects.toThrow();
  });
});
