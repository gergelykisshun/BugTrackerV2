import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [HttpModule, UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
