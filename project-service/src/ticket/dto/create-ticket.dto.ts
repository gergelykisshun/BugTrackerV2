import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createTicketDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string;

  @IsNumber()
  @IsNotEmpty()
  owner: number;

  assignedTo: any[];

  @IsString()
  status: string[];
}
