import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    this.verifyConnection();
  }

  private async verifyConnection() {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection verified successfully');
    } catch (error) {
      this.logger.error('SMTP connection failed:', error);
    }
  }

  async sendContactEmails(contactDto: ContactDto): Promise<void> {
    const { firstName, lastName, email, message } = contactDto;
    const fullName = `${firstName} ${lastName}`;

    const ownerEmailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: this.configService.get<string>('EMAIL_OWNER'), // You'll need to add this to your .env
      subject: `🔔 New Contact Form Submission from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 10px;">New Portfolio Contact</h2>
            <div style="margin: 20px 0;">
              <h3 style="color: #007bff; margin-bottom: 15px;">Contact Details:</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${fullName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            </div>
            <div style="margin: 25px 0;">
              <h3 style="color: #007bff; margin-bottom: 15px;">Message:</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #007bff; border-radius: 5px;">
                <p style="line-height: 1.6; margin: 0;">${message}</p>
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; font-size: 14px;">This message was sent from your portfolio website contact form.</p>
            </div>
          </div>
        </div>
      `,
    };

    const senderEmailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: '✅ Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #28a745; border-bottom: 3px solid #28a745; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">Hi ${firstName},</p>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
              Thank you for contacting me through my portfolio website! I have received your message and will get back to you as soon as possible, typically within 24-48 hours.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #28a745; border-radius: 5px; margin: 25px 0;">
              <h3 style="color: #28a745; margin-bottom: 15px;">Your Message:</h3>
              <p style="line-height: 1.6; margin: 0; font-style: italic;">"${message}"</p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; margin: 20px 0;">
              If you have any urgent questions or need to discuss a project opportunity, feel free to reach out to me directly.
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 10px 0;"><strong>Best regards,</strong></p>
              <p style="margin: 10px 0; color: #007bff; font-weight: bold;">Fareed.developer</p>
              <p style="margin: 10px 0; color: #666;">Backend Developer</p>
            </div>
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px;">This is an automated confirmation email from my portfolio website.</p>
            </div>
          </div>
        </div>
      `,
    };

    try {
      await Promise.all([
        this.transporter.sendMail(ownerEmailOptions),
        this.transporter.sendMail(senderEmailOptions),
      ]);
      this.logger.log(`Contact emails sent successfully to owner and ${email}`);
    } catch (error) {
      this.logger.error('Failed to send contact emails:', error);
      throw error;
    }
  }
}