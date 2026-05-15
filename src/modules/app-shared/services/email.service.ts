import { Injectable, Logger } from '@nestjs/common';
import { createEmailTransporter } from '@utils/email.util';

export interface IEmailAttachment {
  filename: string;
  content: Buffer | string;
}

export interface ISendMailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: IEmailAttachment[];
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendMail(options: ISendMailOptions): Promise<boolean> {
    const transporter = createEmailTransporter();

    if (!transporter) {
      this.logger.warn(
        'SMTP configuration missing. Email service is disabled.',
      );

      return false;
    }

    try {
      const smtpEmail = process.env.SMTP_EMAIL;

      await transporter.sendMail({
        from: smtpEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
        attachments: options.attachments,
      });

      this.logger.log(`Email sent successfully to: ${options.to}`);

      return true;
    } catch (error: any) {
      this.logger.error(
        `Failed to send email to: ${options.to}`,
        error?.stack || error,
      );

      throw error;
    }
  }
}
