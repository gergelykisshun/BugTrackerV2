import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { projectDto } from './dto/project.dto';
import { Project, ProjectDocument } from './entities/project.model';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  async getAll() {
    return this.projectModel.find().exec();
  }

  async getAllProjectsOfUser(userId: number) {
    return this.projectModel
      .find({ $or: [{ owner: userId }, { 'assignedTo.id': userId }] })
      .exec();
  }

  async createProject(project: projectDto) {
    const createdProject = await this.projectModel.create(project);
    return createdProject;
  }

  async addTicketToProject(projectId: string, ticketId: ObjectId) {
    const project = await this.projectModel.findById(projectId);
    if (!project) throw new NotFoundException('Project not found');

    const ticketsCopy = project.tickets;

    if (ticketsCopy.find((id) => String(id) === String(ticketId))) {
      console.log('inside error');
      throw new BadRequestException('ticket already assigned to project');
    }

    ticketsCopy.push(ticketId as ObjectId);

    project.set('tickets', ticketsCopy);

    const res = await project.save();

    return res;
  }
}
