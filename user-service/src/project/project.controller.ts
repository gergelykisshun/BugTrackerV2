import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createProjectDto } from './dto/createProject.dto';

@Controller('projects')
export class ProjectController {
  constructor(private httpService: HttpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Body() createProjectDto: createProjectDto) {
    try {
      console.log(createProjectDto);
      console.log('Inside orchestrator project creator');
      const res = await this.httpService.axiosRef.post(
        'http://localhost:8001/api/v1/projects',
        createProjectDto,
      );
      console.log('what is the result that gets to orchestrator', res);
      return { msg: `Project created: ${res.data.title}`, project: res.data };
    } catch (e) {
      console.log('orchestrator went into catch');
      throw new InternalServerErrorException();
    }
  }
}
