import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

import { User } from './entities/user.entity';
import { IRegisterConfirmationEmail } from './interfaces/email-template';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject('MAIL_SERVICE') private readonly client: ClientProxy,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'email', 'username', 'role'],
    });
  }

  async createUser(user: createUserDto): Promise<User> {
    try {
      await this.client.connect();
    } catch (e) {
      throw new InternalServerErrorException(
        'Email service is not working, we cannot initiate register requests!',
      );
    }

    const registerToken = uuidv4();

    const userCreated = await this.userRepository.save({
      ...user,
      isActive: false,
      registerToken,
    });
    delete userCreated.password;

    this.client.emit('register-confirmation', {
      username: user.username,
      email: user.email,
      redirectUrl: `http://localhost:3000/activate-account?token=${registerToken}`,
    } as IRegisterConfirmationEmail);

    return userCreated;
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneBy({ username });
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async getOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  async update(id: number, user: createUserDto) {
    return this.userRepository.update(id, user);
  }
  async delete(id: number) {
    return this.userRepository.delete(id);
  }
  async activateAccount(token: string) {
    const user = await this.userRepository.findOneBy({ registerToken: token });
    if (!user)
      throw new NotFoundException(`User not found by token: ${token}!`);

    console.log('user before', user);

    user.registerToken = '';
    user.isActive = true;

    console.log('user after', user);

    return this.userRepository.save(user);
  }
}
