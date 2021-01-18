import { IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FeatureBustSize, FeatureShoulderSize, FeatureShoulderShape } from './features.enum';
import { Exclude } from 'class-transformer';

export class QuizFeatures {
  @IsEnum(FeatureBustSize)
  @ApiProperty({
    type: String,
    enum: FeatureBustSize,
    example: FeatureBustSize.BIG,
  })
  bustSize: FeatureBustSize;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  hasLargerArms: boolean;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  hasProblematicMidsection: boolean;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  hasLargerThighsOrHips: boolean;

  @IsBoolean()
  @ApiProperty({
    example: false,
  })
  hasLargeLegs: boolean;

  @IsEnum(FeatureShoulderSize)
  @ApiProperty({
    type: String,
    enum: FeatureShoulderSize,
    example: FeatureShoulderSize.WIDE,
  })
  shoulderSize: FeatureShoulderSize;

  @IsEnum(FeatureShoulderShape)
  @ApiProperty({
    type: String,
    enum: FeatureShoulderShape,
    example: FeatureShoulderShape.TAPPERD,
  })
  shoulderShape: FeatureShoulderShape;

  constructor(
    bustSize: FeatureBustSize,
    hasLargerArms: boolean,
    hasProblematicMidsection: boolean,
    hasLargerThighsOrHips: boolean,
    hasLargeLegs: boolean,
    shoulderSize: FeatureShoulderSize,
    shoulderShape: FeatureShoulderShape,
  ) {
    this.bustSize = bustSize;
    this.hasLargerArms = hasLargerArms;
    this.hasProblematicMidsection = hasProblematicMidsection;
    this.hasLargerThighsOrHips = hasLargerThighsOrHips;
    this.hasLargeLegs = hasLargeLegs;
    this.shoulderSize = shoulderSize;
    this.shoulderShape = shoulderShape;
  }

  @Exclude()
  toJson() {
    return {
      bustSize: this.bustSize,
      hasLargerArms: this.hasLargerArms,
      hasProblematicMidsection: this.hasProblematicMidsection,
      hasLargerThighsOrHips: this.hasLargerThighsOrHips,
      hasLargeLegs: this.hasLargeLegs,
      shoulderSize: this.shoulderSize,
      shoulderShape: this.shoulderShape,
    };
  }
}
