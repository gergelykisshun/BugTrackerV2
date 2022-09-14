import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { projectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async allController(@Query('userId', new ParseIntPipe()) userId: number) {
    if (userId === 0) {
      const response = await this.projectService.getAll();
      return response;
    }
    const response = await this.projectService.getAllProjectsOfUser(userId);
    return response;
  }

  @Post()
  async createController(@Body() projectDto: projectDto) {
    return this.projectService.createProject(projectDto);
  }

  // RABBITMQ endpoint
  @EventPattern('emitId')
  async helloListener(data: string) {
    console.log(data);
    return data;
  }
}
