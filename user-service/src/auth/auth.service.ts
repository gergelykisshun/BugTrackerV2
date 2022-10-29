import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { comparePass } from 'src/user/utilities/hash';
import { loginUserDto } from './dtos/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: loginUserDto) {
    const user = await this.userService.findOneByUsername(loginDto.username);
    if (!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND);

    const passwordChecked = await comparePass(loginDto.password, user.password);
    if (!passwordChecked) throw new ForbiddenException('Incorrect password!');

    if (!user.isActive)
      throw new HttpException('Account is not active!', HttpStatus.FORBIDDEN);

    delete user.password;

    return user;
  }

  async generateUserToken(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
