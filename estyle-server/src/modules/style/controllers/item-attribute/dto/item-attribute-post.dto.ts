import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsArray } from 'class-validator';

export class ItemAttributePostDto {
  @IsString()
  @ApiProperty({
    example: 'Long sleeves',
  })
  name: string;

  @IsMongoId()
  @ApiProperty({
    example: '5e77971ea2b7542523641b9a',
  })
  type: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: String,
    example: ['https://long-sleeves.com/image.png'],
  })
  pictures: string[];
}
