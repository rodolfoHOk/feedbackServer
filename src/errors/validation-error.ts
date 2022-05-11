import { BusinessError } from './business-error';

export class ValidationError extends BusinessError {
  field: string;

  constructor(message: string, field: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}
