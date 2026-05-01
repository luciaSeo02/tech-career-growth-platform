import { Injectable } from '@nestjs/common';
import * as brevo from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private apiInstance: brevo.TransactionalEmailsApi;

  constructor() {
    this.apiInstance = new brevo.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY ?? '',
    );
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'Verify your email';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = {
      name: 'Career Platform',
      email: 'no-reply@careerplatform.com',
    };
    sendSmtpEmail.htmlContent = `
      <h2>Verify your email</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${url}">${url}</a>
    `;

    await this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'Reset your password';
    sendSmtpEmail.to = [{ email }];
    sendSmtpEmail.sender = {
      name: 'Career Platform',
      email: 'no-reply@careerplatform.com',
    };
    sendSmtpEmail.htmlContent = `
      <h2>Reset your password</h2>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}">${url}</a>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `;

    await this.apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}
