import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

import { User } from './entities/user.entity';
import { IRegisterConfirmationEmail } from './interfaces/email-template';

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

    const userCreated = await this.userRepository.save({
      ...user,
      isActive: false,
    });
    delete userCreated.password;

    this.client.emit('register-confirmation', {
      username: user.username,
      email: user.email,
      redirectUrl: 'http://localhost:3000/activate-account',
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
}
