import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const EMAIL_MAILTRAP_SMTP = 'smtp.mailtrap.io';
const EMAIL_MAILTRAP_PORT = 2525;

const transport = nodemailer.createTransport({
  host: EMAIL_MAILTRAP_SMTP,
  port: EMAIL_MAILTRAP_PORT,
  auth: {
    user: process.env.EMAIL_MAILTRAP_USERNAME,
    pass: process.env.EMAIL_MAILTRAP_PASSWORD,
  },
});

export class MailtrapNodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'FeedGet Support <testes.dev.hiok@gmail.com>',
      subject,
      html: body,
    });
  }
}
