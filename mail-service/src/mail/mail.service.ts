import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { sendEmailDto } from './dto/send-email.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendRegisterConfirmationEmail(sendEmailDto: sendEmailDto) {
    return this.mailerService.sendMail({
      to: sendEmailDto.email, // list of receivers
      from: 'noreply@bug-tracker.com', // sender address
      subject: 'Registration confirmation', // Subject line
      template: './registerConfirmation',
      context: {
        name: sendEmailDto.username,
        redirectUrl: sendEmailDto.redirectUrl,
      },
    });
  }
}
