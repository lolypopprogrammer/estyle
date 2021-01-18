import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginPostDto {
  @IsEmail()
  @ApiProperty({
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    example: 'StrongPassword123',
  })
  password: string;
}
