import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BodyShapePostDto {
  @IsString()
  @ApiProperty({
    example: 'Pear shape',
  })
  name: string;
}
