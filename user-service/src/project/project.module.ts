import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [HttpModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
