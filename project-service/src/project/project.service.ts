import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
