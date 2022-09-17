import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addTicketToProjectDto {
  @IsString()
  @IsNotEmpty()
  ticketId: string;
}
