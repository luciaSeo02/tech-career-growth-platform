import { Injectable } from '@nestjs/common';

interface BrevoResponse {
  messageId: string;
}

@Injectable()
export class EmailService {
  private readonly apiKey = process.env.BREVO_API_KEY ?? '';
  private readonly apiUrl = 'https://api.brevo.com/v3/smtp/email';

  private async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<BrevoResponse> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'trckr',
          email: 'luciaseo20@gmail.com',
        },
        to: [{ email: to }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const error: unknown = await response.json();
      throw new Error(`Brevo API error: ${JSON.stringify(error)}`);
    }

    return response.json() as Promise<BrevoResponse>;
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    await this.sendEmail(
      email,
      'Verify your email',
      `<table width="100%" cellpadding="0" cellspacing="0"  style="background-color: #f5f5f5; padding: 32px 0;">
  <tr>
    <td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px;">
        <tr>
          <td style="padding: 32px 32px 24px; border-bottom: 1px solid #e0e0e0;">
            <span style="font-family: monospace; font-size: 14px; color: #00d4aa; letter-spacing: 0.1em;">my/trckr</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px;">
            <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 600; color: #111111;">Verify your email</h2>
            <p style="margin: 0 0 24px; font-size: 14px; color: #555555; line-height: 1.6;">Click the button below to verify your account and start tracking your career.</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #00d4aa; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Verify email →</a>
            <p style="margin: 24px 0 0; font-size: 12px; color: #999999; line-height: 1.5;">If you didn't create an account, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 32px; border-top: 1px solid #e0e0e0; text-align: center;">
            <span style="font-family: monospace; font-size: 11px; color: #999999;">my/trckr — track your tech career</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    );
  }

  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await this.sendEmail(
      email,
      'Reset your password',
      `<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 32px 0;">
  <tr>
    <td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px;">
        <tr>
          <td style="padding: 32px 32px 24px; border-bottom: 1px solid #e0e0e0;">
            <span style="font-family: monospace; font-size: 14px; color: #00d4aa; letter-spacing: 0.1em;">my/trckr</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px;">
            <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: 600; color: #111111;">Reset your password</h2>
            <p style="margin: 0 0 24px; font-size: 14px; color: #555555; line-height: 1.6;">Click the button below to reset your password. This link expires in 1 hour.</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #00d4aa; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600;">Reset password</a>
            <p style="margin: 24px 0 0; font-size: 12px; color: #999999; line-height: 1.5;">If you didn't request this, you can safely ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 32px; border-top: 1px solid #e0e0e0; text-align: center;">
            <span style="font-family: monospace; font-size: 11px; color: #999999;">my/trckr — track your tech career</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
    );
  }
}
