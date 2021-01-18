import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { VerticalBodyShape, HorizontalBodyShape, HeightCategory, NeckSize, BMICategory } from './measurements.enum';
import { Exclude } from 'class-transformer';

export class QuizMeasurements {
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 167,
    description: 'Height in cm',
  })
  height: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 60,
    default: 'Weight in Kg',
  })
  weight: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 95,
    default: 'Shoulder size in cm',
  })
  shoulderSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 89,
    default: 'Bust size in cm',
  })
  bustSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 76,
    default: 'Waist size in cm',
  })
  waistSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 97,
    default: 'Hip size in cm',
  })
  hipSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 15,
    default: 'Wrist size in cm',
  })
  wristSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 22,
    default: 'Ankle size in cm',
  })
  ankleSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 44,
    default: 'Head to bust size in cm',
  })
  headToBustSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 28,
    default: 'Bust to hip size in cm',
  })
  bustToHipSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 46,
    default: 'Hip to knee size in cm',
  })
  hipToKneeSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 48,
    default: 'Hip to floor size in cm',
  })
  kneeToFloorSize: number;

  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 8,
    default: 'Neck size in cm',
  })
  neckSize: number;

  constructor(
    height: number,
    weight: number,
    shoulderSize: number,
    bustSize: number,
    waistSize: number,
    hipSize: number,
    wristSize: number,
    ankleSize: number,
    headToBustSize: number,
    bustToHipSize: number,
    hipToKneeSize: number,
    kneeToFloorSize: number,
    neckSize: number,
  ) {
    this.height = height;
    this.weight = weight;
    this.shoulderSize = shoulderSize;
    this.bustSize = bustSize;
    this.waistSize = waistSize;
    this.hipSize = hipSize;
    this.wristSize = wristSize;
    this.ankleSize = ankleSize;
    this.headToBustSize = headToBustSize;
    this.bustToHipSize = bustToHipSize;
    this.hipToKneeSize = hipToKneeSize;
    this.kneeToFloorSize = kneeToFloorSize;
    this.neckSize = neckSize;
  }

  @Exclude()
  get isHourglass(): boolean {
    if (Math.abs(this.bustSize - this.hipSize) >= 2) return false;
    if (Math.abs(100 - ((this.shoulderSize * 100) / this.hipSize)) > 5) return false;
    if (100 - ((this.waistSize * 100) / Math.min(this.shoulderSize, this.hipSize, this.bustSize)) < 25) return false;
    return true;
  }

  @Exclude()
  get isTriangular(): boolean {
    return this.hipSize - this.bustSize > 7.5;
  }

  @Exclude()
  get isRectangular(): boolean {
    return this.bustSize - this.waistSize > 15 || this.hipSize - this.waistSize > 18;
  }

  @Exclude()
  get isInvertedTriangular(): boolean {
    return this.bustSize - this.hipSize >= 2.5;
  }

  @Exclude()
  get isDiamond(): boolean {
    return this.waistSize > this.bustSize || this.waistSize > this.hipSize;
  }

  @Exclude()
  get horizontalBodyShape(): HorizontalBodyShape {
    if (this.isHourglass) return HorizontalBodyShape.HOURSGLASS;
    if (this.isTriangular) return HorizontalBodyShape.TRIANGULAR;
    if (this.isRectangular) return HorizontalBodyShape.RECTANGULAR;
    if (this.isInvertedTriangular) return HorizontalBodyShape.INVERTEDTRIANGULAR;
    if (this.isDiamond) return HorizontalBodyShape.DIAMOND;
    return HorizontalBodyShape.OVAL;
  }

  @Exclude()
  get verticalBodyShape(): VerticalBodyShape {
    if ((this.hipToKneeSize + this.kneeToFloorSize) - (this.headToBustSize + this.bustToHipSize) >= 7.5) {
      return VerticalBodyShape.LONGLEGSSHORTTORSO;
    }
    if ((this.headToBustSize + this.bustToHipSize) - (this.hipToKneeSize + this.kneeToFloorSize) >= 2) {
      return VerticalBodyShape.SHORTLEGSLONGTORSO;
    }
    return VerticalBodyShape.BALANCED;
  }

  @Exclude()
  get heightCategory(): HeightCategory {
    if (this.height < 160) return HeightCategory.PETITE;
    if (this.height < 162.5) return HeightCategory.SMALL;
    if (this.height < 170) return HeightCategory.MEDIUM;
    return HeightCategory.TALL;
  }

  @Exclude()
  get neckSizeCategory(): NeckSize {
    if (this.height < 6.4) return NeckSize.SMALL;
    if (this.height < 9) return NeckSize.MEDIUM;
    return NeckSize.LONG;
  }

  @Exclude()
  get bmi(): BMICategory {
    const calculated = this.weight / Math.pow(this.height / 100, 2);
    if (calculated < 18.5) return BMICategory.VERYTHIN;
    if (calculated < 24.9) return BMICategory.NORMAL;
    return BMICategory.OVERWEIGHT;
  }

  @Exclude()
  toJson() {
    return {
      height: this.height,
      weight: this.weight,
      shoulderSize: this.shoulderSize,
      bustSize: this.bustSize,
      waistSize: this.waistSize,
      hipSize: this.hipSize,
      wristSize: this.wristSize,
      ankleSize: this.ankleSize,
      headToBustSize: this.headToBustSize,
      bustToHipSize: this.bustToHipSize,
      hipToKneeSize: this.hipToKneeSize,
      kneeToFloorSize: this.kneeToFloorSize,
      neckSize: this.neckSize,
    };
  }
}
