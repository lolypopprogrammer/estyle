import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsString,
    IsArray,
    IsBoolean,
    IsOptional,
    IsMongoId,
} from 'class-validator';

export class OutfitPostDto {
    @IsString()
    @ApiProperty({
        example: 'Top',
    })
    name: string;

    // @ApiProperty({
    //     type: 'string',
    //     format: 'binary',
    // })
    // picture: any;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'description',
    })
    description: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
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
