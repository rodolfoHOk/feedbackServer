import { Feedback } from '@prisma/client';
import { MailAdapter } from '../adapters/mail-adapter';
import { ValidationError } from '../errors/validation-error';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

enum FeedbackType {
  BUG,
  IDEA,
  OTHER,
}

export interface SubmitFeedBackRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedBackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedBackRequest): Promise<Feedback> {
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new ValidationError('Type is required', 'type');
    }

    if (
      type !== FeedbackType.BUG.toString() &&
      type !== FeedbackType.IDEA.toString() &&
      type !== FeedbackType.OTHER.toString()
    ) {
      throw new ValidationError('Type informed is invalid', 'type');
    }

    if (!comment) {
      throw new ValidationError('Comment is required', 'comment');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new ValidationError('Invalid screenshot format', 'screenshot');
    }

    const feedback = await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}" alt="screenshot"/>` : null,
        `</div>`,
      ].join('\n'),
    });

    return feedback;
  }
}
