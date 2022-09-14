import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createProjectDto } from './dto/createProject.dto';

@Controller('projects')
export class ProjectController {
  constructor(private httpService: HttpService) {}

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
      return res.data;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
