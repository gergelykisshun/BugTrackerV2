import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { nextTick } from 'process';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.authService.generateUserToken(req.user);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { msg: 'Successfully logged in!', user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(200);
  }

  // @Post('login')
  // async login(
  //   @Body() userDto: loginUserDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {

  //   const jwt = await this.jwtService.signAsync({ id: user.id });

  //   res.cookie('jwt', jwt, { httpOnly: true });

  //   return { msg: 'success' };
  // }
}
