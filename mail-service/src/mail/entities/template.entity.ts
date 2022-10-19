import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailTemplateDocument = EmailTemplate & Document;

@Schema()
export class EmailTemplate {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  body: string;
}

export const EmailTemplateSchema = SchemaFactory.createForClass(EmailTemplate);
