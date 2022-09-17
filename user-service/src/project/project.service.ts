import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createTicketDto } from './dto/create-ticket.dto';
import { IProjectOfUser } from './responseTypes/responseTypes';

@Injectable()
export class ProjectService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  async hydrateProjectOwner(projects: IProjectOfUser[]) {
    return await Promise.all(
      projects.map(async (project) => {
        try {
          const hydratedWithOwner: IProjectOfUser = {
            ...project,
            owner: await this.userService.getOne(project.owner as number),
          };
          return hydratedWithOwner;
        } catch (e) {
          return project;
        }
      }),
    );
  }

  async assignTicketToProjectProcess(
    projectId: string,
    ticketData: createTicketDto,
  ) {
    const responseTicketCreation = await this.httpService.axiosRef.post(
      'http://project_service:8001/api/v1/tickets',
      ticketData,
    );

    if (!responseTicketCreation.data._id)
      throw new InternalServerErrorException('Failed to create ticket!');

    const ticketId = responseTicketCreation.data._id;

    const resAddToProject = await this.httpService.axiosRef.patch(
      `http://project_service:8001/api/v1/projects/add-ticket/${projectId}`,
      { ticketId },
    );

    return resAddToProject.data;
  }

  async getProjectById(projectId: string) {
    try {
      const project = await this.httpService.axiosRef.get(
        `http://project_service:8001/api/v1/projects/${projectId}`,
      );
      return project.data;
    } catch (e) {
      throw new NotFoundException('Project not found!');
    }
  }
}
