import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';
import { hashPass } from './utilities/hash';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async allController() {
    console.log('hey');
    this.client.emit('emitId', 'Hello rbbitmq');
    return this.userService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const { username } = req.user as { userId: string; username: string };
    if (!username) throw new BadRequestException();

    const user = await this.userService.findOneByUsername(username);

    if (!user) throw new NotFoundException();
    delete user.password;

    return user;
  }

  @Post()
  async createController(@Body() userDto: createUserDto) {
    const usernameInUse = await this.userService.findOneByUsername(
      userDto.username,
    );
    if (usernameInUse)
      throw new BadRequestException('Username is already in use!');

    const emailInUse = await this.userService.findOneByEmail(userDto.email);
    if (emailInUse) throw new BadRequestException('Email is already in use!');

    const user = { ...userDto, password: await hashPass(userDto.password) };
    return this.userService.createUser(user);
  }

  @Get(':id')
  async getController(@Param('id') id: number) {
    const user = await this.userService.getOne(id);
    if (!user) throw new NotFoundException('User not found!');
    return user;
  }

  @Put(':id')
  async putController(@Param('id') id: number, @Body() userDto: createUserDto) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  async deleteController(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @Post('assign-to-project/:userId/:projectId')
  async assignToProjectController(
    @Param('userId') userId: number,
    @Param('eventId') eventId: number,
  ) {
    const user = await this.getController(userId);
    if (!user) throw new NotFoundException('User not found!');
  }
}
