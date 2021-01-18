import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsArray,
    IsBoolean,
    IsOptional,
    IsMongoId,
} from 'class-validator';

export class OutfitDto {
    @IsString()
    @ApiProperty({
        example: 'Top',
    })
    name: string;

    @IsArray()
    @ApiProperty({
        isArray: true,
        type: String,
        example: ['https://tops.com/image.png'],
    })
    pictures: string[];

    @ApiProperty({
        example: '2020-03-22T16:44:44.339Z',
    })
    createdOn: string;

    @IsMongoId()
    @ApiProperty({
        type: Types.ObjectId,
    })
    author: object;

    @IsString()
    @ApiProperty({
        example: 'description',
    })
    description: string;

    @IsBoolean()
    @ApiProperty({
        example: true,
    })
    isPublic: boolean;

    @IsOptional()
    @IsArray()
    @ApiProperty({
        isArray: true,
        type: String,
        example: ['5e70cbf1c87732ed76198dfe'],
    })
    brands: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @ApiProperty({
        isArray: true,
        type: String,
        example: ['5e70cbf1c87732ed76198dfe'],
    })
    items: Types.ObjectId[];

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({})
    likes: Types.ObjectId[];

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({})
    views: Types.ObjectId[];

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({})
    comments: Types.ObjectId[];

    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        type: String,
        example: '5f79e81f2462421c2855ee0c',
    })
    bodyShape: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        type: String,
        example: '5f79e6df2462421c2855ee0b',
    })
    personalStyle: Types.ObjectId;

    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        type: String,
        example: '5f79e6df2462421c2855ee2b',
    })
    occasion: Types.ObjectId;
}
