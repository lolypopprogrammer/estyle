import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPostDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}
