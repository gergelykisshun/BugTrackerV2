import { IsNotEmpty, IsString } from 'class-validator';

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  assignedTo: string[];

  tickets: string[];
}
