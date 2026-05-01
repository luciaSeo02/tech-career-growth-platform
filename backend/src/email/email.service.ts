import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly apiKey = process.env.BREVO_API_KEY ?? '';
  private readonly apiUrl = 'https://api.brevo.com/v3/smtp/email';

  private async sendEmail(to: string, subject: string, htmlContent: string) {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Career Platform',
          email: 'luciaseo20@gmail.com',
        },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Brevo API error: ${JSON.stringify(error)}`);
    }

    return response.json();
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    await this.sendEmail(
      email,
      'Verify your email',
      `<h2>Verify your email</h2>
       <p>Click the link below to verify your account:</p>
       <a href="${url}">${url}</a>`,
    );
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.sendEmail(
      email,
      'Reset your password',
      `<h2>Reset your password</h2>
       <p>Click the link below to reset your password. Expires in 1 hour.</p>
       <a href="${url}">${url}</a>
       <p>If you didn't request this, ignore this email.</p>`,
    );
  }
}
