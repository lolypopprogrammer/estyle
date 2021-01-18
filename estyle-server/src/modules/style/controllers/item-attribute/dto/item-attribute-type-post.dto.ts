import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class ItemAttributeTypePostDto {
  @IsString()
  @ApiProperty({
    example: 'Sleeves',
  })
  name: string;
}
