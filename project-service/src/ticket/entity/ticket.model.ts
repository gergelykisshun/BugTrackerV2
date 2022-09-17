import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  priority: string;

  @Prop({ required: true })
  owner: number;

  @Prop({ default: [] })
  assignedTo: any[];

  @Prop({ default: 'TODO' })
  status: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
