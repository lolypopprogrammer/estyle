import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsMongoId, IsBoolean, IsNumber } from 'class-validator';

export class ClothingItemDto {
  @IsString()
  @ApiProperty({
    example: 'Top',
  })
  name: string;

  @IsArray()
  @ApiProperty({
    isArray: false,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  pictures: string[];

  @IsMongoId()
  @ApiProperty({
    type: Types.ObjectId,
  })
  category: object;

  @IsMongoId()
  @ApiProperty({
    type: Types.ObjectId,
  })
  author: object;

  @IsString()
  @ApiProperty({
    type: String,
  })
  length: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  waistline: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  brand: string;

  @IsString()
  @ApiProperty({
    type: String,
  })
  occasions: string;

  @IsArray()
  @ApiProperty({
    isArray: true,
    type: String,
    example: ['#new'],
  })
  tags: string[];

  @IsString()
  @ApiProperty({
    type: String,
  })
  notes: string;

  @IsBoolean()
  @ApiProperty({
    type: Boolean,
  })
  isFavorite: boolean;

  @IsNumber()
  @ApiProperty({
    type: Number,
  })
  price: number;

  @ApiProperty({
    example: '2020-03-22T16:44:44.339Z',
  })
  createdOn: string;
}
