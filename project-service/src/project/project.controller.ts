import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { projectDto } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get()
  async allController() {
    return this.projectService.getAll();
  }

  @Post()
  async createController(@Body() projectDto: projectDto) {
    console.log('inside project microservice');
    console.log('body', projectDto);

    return this.projectService.createProject(projectDto);
  }

  // RABBITMQ endpoint
  @EventPattern('emitId')
  async helloListener(data: string) {
    console.log(data);
    return data;
  }
}
