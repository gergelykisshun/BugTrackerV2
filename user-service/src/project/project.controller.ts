import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createProjectDto } from './dto/create-project.dto';
import { createTicketDto } from './dto/create-ticket.dto';
import { ProjectService } from './project.service';
import { IProjectOfUser } from './responseTypes/responseTypes';

@Controller('projects')
export class ProjectController {
  constructor(
    private httpService: HttpService,
    private projectService: ProjectService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Body() createProjectDto: createProjectDto) {
    try {
      const res = await this.httpService.axiosRef.post(
        'http://project_service:8001/api/v1/projects',
        createProjectDto,
      );

      return { msg: `Project created: ${res.data.title}`, project: res.data };
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllProjectsOfUser(@Req() req: Request) {
    const { userId } = req.user as { userId: string; username: string };
    try {
      const res = await this.httpService.axiosRef.get(
        `http://project_service:8001/api/v1/projects?userId=${userId}`,
      );

      const projectsOfUser: IProjectOfUser[] = res.data;

      try {
        const hydratedProjects = await this.projectService.hydrateProjectOwner(
          projectsOfUser,
        );
        return hydratedProjects;
      } catch (e) {
        return projectsOfUser;
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    return this.projectService.getProjectById(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('new-ticket/:projectId')
  async assignTicketToProject(
    @Param('projectId') projectId: string,
    @Body() createTicketDto: createTicketDto,
  ) {
    return this.projectService.assignTicketToProjectProcess(
      projectId,
      createTicketDto,
    );
  }
}
