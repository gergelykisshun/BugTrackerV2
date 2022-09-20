import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class addTicketToProjectDto {
  @IsString()
  @IsNotEmpty()
  ticketId: ObjectId;
}
