import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private mailService: AppService) {}

  @Get('register')
  async register() {
    return 'Email sent';
    this.mailService.sendRegisterConfirmationEmail();
  }
}
