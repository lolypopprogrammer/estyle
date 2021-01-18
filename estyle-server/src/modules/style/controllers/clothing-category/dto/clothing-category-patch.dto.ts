import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ClothingCategoryPatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Top',
  })
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiPropertyOptional({
    type: String,
    isArray: true,
  })
  attributeTypes: Types.ObjectId[];
}
