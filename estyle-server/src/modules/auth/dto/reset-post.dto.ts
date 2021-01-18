import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPostDto {
  @IsString()
  @ApiProperty()
  token: string;

  @IsString()
  @ApiProperty()
  password: string;
}
