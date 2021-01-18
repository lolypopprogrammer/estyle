import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsString, IsOptional, IsEnum } from 'class-validator';
import { AttributeType } from './styleguide-item-attribute-type.enum';

export class StyleGuideItemAttributePostDto {
  @IsMongoId()
  @ApiProperty({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  attribute: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  picture: any;

  @IsEnum(AttributeType)
  @ApiProperty({
    type: String,
    enum: AttributeType,
    example: AttributeType.RECOMMEND,
  })
  type: AttributeType;

  @IsString()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet',
  })
  description: string;
}
