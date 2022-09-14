import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IProjectOfUser } from './responseTypes/responseTypes';

@Injectable()
export class ProjectService {
  constructor(private userService: UserService) {}

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
}
