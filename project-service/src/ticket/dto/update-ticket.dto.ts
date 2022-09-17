import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  priority: string;

  @IsNumber()
  owner: number;

  assignedTo: any[];

  @IsString()
  status: string;
}
