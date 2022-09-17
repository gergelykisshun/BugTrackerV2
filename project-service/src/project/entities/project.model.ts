import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Ticket } from 'src/ticket/entity/ticket.model';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  owner: number;

  @Prop({ default: [] })
  assignedTo: { id: number; username: string; email: string; role: string }[];

  @Prop({
    default: [],
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
  })
  tickets: mongoose.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
