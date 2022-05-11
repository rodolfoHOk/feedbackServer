import { MailAdapter, SendMailData } from '../mail-adapter';
import nodemailer from 'nodemailer';

const EMAIL_SENDGRID_SMTP = 'smtp.sendgrid.net';
const EMAIL_SENDGRID_PORT = 587;

const transport = nodemailer.createTransport({
  host: EMAIL_SENDGRID_SMTP,
  port: EMAIL_SENDGRID_PORT,
  auth: {
    user: process.env.EMAIL_SENDGRID_USERNAME,
    pass: process.env.EMAIL_SENDGRID_PASSWORD,
  },
});

export class SendgridNodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'FeedGet Support <testes.dev.hiok@gmail.com>',
      subject,
      html: body,
    });
  }
}
