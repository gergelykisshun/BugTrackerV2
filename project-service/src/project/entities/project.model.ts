import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: [] })
  assignedTo: string[];

  @Prop({ default: [] })
  tickets: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
