import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { registerConfirmationDto } from './dto/register-confirmation.dto';

@Controller('mail')
export class MailController {
  constructor(@Inject('MAIL_SERVICE') private readonly client: ClientProxy) {}

  @Post('register-confirmation')
  async registerConfirmation(
    @Body() registerConfirmationDto: registerConfirmationDto,
  ) {
    try {
      this.client.emit('register-confirmation', registerConfirmationDto);
      return { err: null, msg: 'Register confirmation email sent!' };
    } catch (e) {
      return {
        err: 'Emit failed!',
        msg: 'Register confirmation email failed to send!',
      };
    }
  }
}