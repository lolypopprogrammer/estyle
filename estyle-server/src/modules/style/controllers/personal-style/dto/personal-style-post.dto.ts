import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PersonalStylePostDto {
  @IsString()
  @ApiProperty({
    example: 'Classic',
  })
  name: string;
}
