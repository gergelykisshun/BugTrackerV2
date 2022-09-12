import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { projectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async allController() {
    const response = await this.projectService.getAll();
    console.log('response in micro', response);
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
