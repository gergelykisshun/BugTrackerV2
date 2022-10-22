import { IsNotEmpty, IsString } from 'class-validator';

export class registerConfirmationDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  redirectUrl: string;
}
