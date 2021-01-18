import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StyleGuideItemAttributeDto } from './styleguide-item-attribute.dto';
import { HorizontalBodyShape } from '../../../../../modules/style/models/quiz/measurements/measurements.enum';
import { ProminentFeature } from 'src/modules/style/models/quiz/features/features.enum';

export class StyleGuideItemDto {
  @ApiProperty({
    example: '5e70cbf1c87732ed76198dfe',
  })
  id: string;

  @ApiProperty({
    example: [HorizontalBodyShape.HOURSGLASS],
    enum: HorizontalBodyShape,
    type: String,
    isArray: true,
  })
  bodytype: HorizontalBodyShape[];

  @ApiProperty({
    example: [ProminentFeature.BIGBUST],
    enum: ProminentFeature,
    type: String,
    isArray: true,
  })
  prominentFeature: ProminentFeature[];

  @ApiPropertyOptional({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  clothingCategory: string[];

  @ApiProperty({
    example: 'Best Tops for you',
  })
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet',
  })
  description: string;

  @ApiProperty({
    isArray: true,
    type: StyleGuideItemAttributeDto,
  })
  attributes: StyleGuideItemAttributeDto[];

  @ApiProperty({
    example: '2020-03-22T16:44:44.339Z',
  })
  createdOn: string;
}
