import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean, IsMongoId } from 'class-validator';

export class ClothingItemPostDto {
  @IsString()
  @ApiProperty({
    example: 'Top',
  })
  name: string;


//   @IsArray()
//   @ApiProperty({
//     isArray: true,
//     type: String,
//     example: ['https://tops.com/image.png'],
//   })
//   pictures: string[];

  @IsMongoId()
  @ApiProperty({
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

  @IsString()
  @ApiProperty({
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
