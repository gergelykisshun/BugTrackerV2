import { Body, Controller, Post } from '@nestjs/common';
import { sendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post('register')
  async register(@Body() sendEmailDto: sendEmailDto) {
    return this.mailService.sendRegisterConfirmationEmail(sendEmailDto);
  }
}
