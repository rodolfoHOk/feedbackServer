import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '6e7dcbabb39c2d',
    pass: 'a2b44f941ab81e',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'FeedGet Rudy <testes.dev.hiok@gmail.com>',
      subject,
      html: body,
    });
  }
}
