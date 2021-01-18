import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AttributeType } from './styleguide-item-attribute-type.enum';

export class StyleGuideItemAttributeDto {
  @ApiProperty({
    example: '5e70cbf1c87732ed76198dfe',
  })
  id: string;

  @ApiProperty({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  attribute: string;

  @ApiPropertyOptional({
    example: 'https://images.com/image.png',
  })
  picture: string;

  @ApiProperty({
    type: String,
    enum: AttributeType,
    example: AttributeType.RECOMMEND,
  })
  type: AttributeType;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet',
  })
  description: string;
}
