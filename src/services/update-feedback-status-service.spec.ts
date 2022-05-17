import { Feedback, FeedbackStatus } from '@prisma/client';
import { NotFoundError } from '../errors/not-found-error';
import { ValidationError } from '../errors/validation-error';
import { UpdateFeedbackStatusService } from './update-feedback-status-service';

const DEFAULT_CREATED_AT = new Date();
const DEFAULT_MODIFIED_AT = new Date();

const feedbackReturned: Feedback = {
  id: 'a1b2c3',
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
  status: FeedbackStatus.PENDING,
  created_at: DEFAULT_CREATED_AT,
  modified_at: null,
};

const expectedFeedback: Feedback = {
  id: 'a1b2c3',
  type: 'BUG',
  comment: 'example comment',
  screenshot: 'data:image/png;base64,anyWhere',
  status: FeedbackStatus.RESOLVED,
  created_at: DEFAULT_CREATED_AT,
  modified_at: DEFAULT_MODIFIED_AT,
};

const findByIdSpy = jest.fn();

const updateFeedbackStatus = new UpdateFeedbackStatusService({
  create: async () => feedbackReturned,
  findAll: async () => [feedbackReturned],
  count: async () => 1,
  findById: findByIdSpy,
  updateStatus: async () => expectedFeedback,
});

describe('Update feedback status', () => {
  it('should be throw not found error when called with a invalid id', async () => {
    expect(
      updateFeedbackStatus.execute({
        id: 'invalid_id',
        status: 'RESOLVED',
      })
    ).rejects.toThrow(NotFoundError);
  });

  it('should return a expected feedback when called with a valid id and status', async () => {
    findByIdSpy.mockImplementation((id: string) =>
      Promise.resolve(feedbackReturned)
    );
    expect(
      updateFeedbackStatus.execute({
        id: 'a1b2c3',
        status: 'RESOLVED',
      })
    ).resolves.toBe(expectedFeedback);
  });

  it('should be throw validation error when called with a invalid status', async () => {
    expect(
      updateFeedbackStatus.execute({
        id: 'a1b2c3',
        status: 'INVALID_STATUS',
      })
    ).rejects.toThrow(ValidationError);
  });
});
