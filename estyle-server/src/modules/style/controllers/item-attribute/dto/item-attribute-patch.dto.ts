import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsMongoId, IsString, IsArray } from 'class-validator';

export class ItemAttributePatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Long sleeves',
  })
  name: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    example: '5e77971ea2b7542523641b9a',
  })
  type: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://long-sleeves.com/image.png'],
  })
  pictures: string[];
}
