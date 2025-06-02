import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async sendContactMessage(@Body() contactDto: ContactDto) {
    try {
      await this.contactService.sendContactEmails(contactDto);
      return {
        success: true,
        message: 'Your message has been sent successfully! I will get back to you soon.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.',
        error: error.message,
      };
    }
  }
}