import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsMongoId, IsEnum, IsArray, IsOptional } from 'class-validator';
import { ProminentFeature } from 'src/modules/style/models/quiz/features/features.enum';
import { HorizontalBodyShape } from '../../../../../modules/style/models/quiz/measurements/measurements.enum';

export class StyleGuideItemPostDto {
  @IsOptional()
  @IsArray()
  @IsEnum(HorizontalBodyShape, { each: true})
  @ApiPropertyOptional({
    example: [HorizontalBodyShape.HOURSGLASS],
    enum: HorizontalBodyShape,
    type: String,
    isArray: true,
  })
  bodytype: HorizontalBodyShape[];

  @IsOptional()
  @IsArray()
  @IsEnum(ProminentFeature, { each: true})
  @ApiPropertyOptional({
    example: [ProminentFeature.BIGBUST],
    enum: ProminentFeature,
    type: String,
    isArray: true,
  })
  prominentFeature: ProminentFeature[];

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    example: '5e77a14cf82bb4cb8afe6410',
  })
  clothingCategory: string;

  @IsString()
  @ApiProperty({
    example: 'Best Tops for you',
  })
  title: string;

  @IsString()
  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet',
  })
  description: string;
}
