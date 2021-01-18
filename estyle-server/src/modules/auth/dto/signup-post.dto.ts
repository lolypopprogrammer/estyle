import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupPostDto {
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

  @IsString()
  @ApiProperty({
    example: 'StrongPassword123',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    example: 'firstName',
  })
  firstName: string;

  @IsString()
  @ApiProperty({
    example: 'firstName',
  })
  lastName: string;
}
