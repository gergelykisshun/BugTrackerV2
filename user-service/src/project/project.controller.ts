import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
        'http://localhost:8001/api/v1/projects',
        createProjectDto,
      );
      return res.data;
    } catch (e) {
      return null;
    }
  }
}
