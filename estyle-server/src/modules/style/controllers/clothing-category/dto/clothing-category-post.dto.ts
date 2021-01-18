import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ClothingCategoryPostDto {
  @IsString()
  @ApiProperty({
    example: 'Top',
  })
  name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({
    type: String,
    isArray: true,
  })
  attributeTypes: Types.ObjectId[];
}
