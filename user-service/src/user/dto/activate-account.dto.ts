import { IsNotEmpty, IsString } from 'class-validator';

export class activateAccounDto {
  @IsString()
  @IsNotEmpty()
  registerToken: string;
}
