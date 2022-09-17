import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  owner: number;

  assignedTo: string[];

  tickets: string[];
}
