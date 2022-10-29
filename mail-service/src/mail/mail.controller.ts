import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { sendEmailDto } from './dto/send-email.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @EventPattern('register-confirmation')
  async register(sendEmailDto: sendEmailDto) {
    console.log('CAUGHT REGISTER CONFIRMATION MSG FROM RMQ');
    return this.mailService.sendRegisterConfirmationEmail(sendEmailDto);
  }
}
