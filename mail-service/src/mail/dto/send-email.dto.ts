import { IsNotEmpty, IsString } from 'class-validator';

export class sendEmailDto {
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
