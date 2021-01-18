import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsArray,
    IsBoolean,
    IsOptional,
    IsMongoId,
} from 'class-validator';

export class OutfitPatchDto {
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
    @IsString()
    @ApiPropertyOptional({
        example: 'description',
    })
    description: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'structure',
    })
    structure: string;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({
        example: false,
    })
    isPublic: boolean;

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({})
    likes: Types.ObjectId[];

    @IsOptional()
    @IsMongoId()
    @ApiPropertyOptional({})
    views: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @ApiProperty({
        example: ['5e70cbf1c87732ed76198dfe'],
    })
    brands: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    @ApiProperty({
        example: ['5e70cbf1c87732ed76198dfe'],
    })
    items: Types.ObjectId[];

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
