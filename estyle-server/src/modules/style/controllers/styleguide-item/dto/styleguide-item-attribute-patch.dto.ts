import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsString, IsOptional, IsEnum } from 'class-validator';
import { AttributeType } from './styleguide-item-attribute-type.enum';

export class StyleGuideItemAttributePatchDto {
  @IsMongoId()
  @ApiPropertyOptional({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  id: string;

  @IsMongoId()
  @ApiPropertyOptional({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  attribute: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  picture: any;

  @IsOptional()
  @IsEnum(AttributeType)
  @ApiPropertyOptional({
    type: String,
    enum: AttributeType,
    example: AttributeType.RECOMMEND,
  })
  type: AttributeType;

  @IsString()
  @ApiPropertyOptional({
    example: 'Lorem ipsum dolor sit amet',
  })
  description: string;
}
