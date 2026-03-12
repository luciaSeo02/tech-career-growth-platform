import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async sendVerificationEmail(email: string, token: string) {
    console.log('Sending verification email to:', email);

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const info = await transporter.sendMail({
      from: '"Career Platform" <no-reply@careerplatform.com>',
      to: email,
      subject: 'Verify your email',
      html: `
        <h2>Verify your email</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${url}">${url}</a>
      `,
    });

    console.log('Message sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }
}
