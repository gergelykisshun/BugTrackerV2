import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(user: createUserDto): Promise<User> {
    const userCreated = await this.userRepository.save(user);
    delete userCreated.password;
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
