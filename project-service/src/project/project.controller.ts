import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { addTicketToProjectDto } from './dto/addTicketToProject.dto';
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

  @Patch('/add-ticket/:projectId')
  async addTicketToProject(
    @Param('projectId') projectId: string,
    @Body() addTicketToProjectDto: addTicketToProjectDto,
  ) {
    return this.projectService.addTicketToProject(
      projectId,
      addTicketToProjectDto.ticketId,
    );
  }

  // RABBITMQ endpoint
  @EventPattern('emitId')
  async helloListener(data: string) {
    console.log(data);
    return data;
  }
}
