import { Types } from 'mongoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsArray, IsBoolean, IsMongoId } from 'class-validator';

export class ClothingItemPatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Top',
  })
  name: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  pictures: string[];

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    type: Types.ObjectId,
  })
  category: object;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  length: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  waistline: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  brand: string;

  @IsOptional()
  // @IsArray()
  @IsString({ each: true })
  @ApiPropertyOptional({
    isArray: true,
    type: [String],
    example: ['#new'],
  })
  tags: string[];

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
  })
  notes: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
  })
  isFavorite: boolean;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
  })
  price: number;
}
