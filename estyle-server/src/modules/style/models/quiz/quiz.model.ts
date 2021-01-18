import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ValidateNested } from 'class-validator';
import { QuizGoal } from './goal/goal.model';
import { QuizMeasurements } from './measurements/measurements.model';
import { QuizFeatures } from './features/features.model';
import { VerticalBodyShape, HorizontalBodyShape, HeightCategory, NeckSize, BMICategory } from './measurements/measurements.enum';
import { Exclude } from 'class-transformer';
import { PersonalityAnswer } from './peronaility-answer.enum';

export class Quiz {
  @ApiProperty({
    type: String,
    example: '5ea471bf8bbb506a9afe8423',
  })
  id: Types.ObjectId;

  @ApiProperty({
    type: String,
    example: '5ea58f57bcf4034f7920156b',
  })
  user: Types.ObjectId;

  @ValidateNested()
  @ApiProperty({
    type: QuizGoal,
  })
  goals: QuizGoal;

  @ValidateNested()
  @ApiProperty({
    type: QuizMeasurements,
  })
  measurements: QuizMeasurements;

  @ValidateNested()
  @ApiProperty({
    type: QuizFeatures,
  })
  fatures: QuizFeatures;

  @ApiProperty({
    default: PersonalityAnswer.A,
    enum: PersonalityAnswer,
    type: String,
    isArray: true,
  })
  personalityAnswers: PersonalityAnswer[];

  isArchived: boolean;

  constructor(
    user: Types.ObjectId,
    goals: QuizGoal,
    measurements: QuizMeasurements,
    fatures: QuizFeatures,
    personalityAnswers: PersonalityAnswer[],
    isArchived: boolean,
    id?: Types.ObjectId,
  ) {
    this.user = user;
    this.goals = goals;
    this.measurements = measurements;
    this.fatures = fatures;
    this.personalityAnswers = personalityAnswers;
    this.isArchived = isArchived;
    this.id = id;
  }

  @ApiProperty({
    type: String,
    enum: VerticalBodyShape,
  })
  get verticalBodyShape(): VerticalBodyShape {
    return this.measurements.verticalBodyShape;
  }

  @ApiProperty({
    type: String,
    enum: HorizontalBodyShape,
  })
  get horizontalBodyShape(): HorizontalBodyShape {
    return this.measurements.horizontalBodyShape;
  }

  @ApiProperty({
    type: String,
    enum: HeightCategory,
  })
  get heightCategory(): HeightCategory {
    return this.measurements.heightCategory;
  }

  @ApiProperty({
    type: String,
    enum: NeckSize,
  })
  get neckSizeCategory(): NeckSize {
    return this.measurements.neckSizeCategory;
  }

  @ApiProperty({
    type: String,
    enum: BMICategory,
  })
  get bmi(): BMICategory {
    return this.measurements.bmi;
  }

  @Exclude()
  toJson() {
    const agg = this.personalityAnswers.reduce((acc, cur) => {
      acc[cur] = acc[cur] || 0;
      acc[cur]++;
      return acc;
    }, {});
    return {
      id: this.id,
      user: this.user,
      goals: this.goals?.toJson(),
      measurements: this.measurements.toJson(),
      fatures: this.fatures.toJson(),
      verticalBodyShape: this.verticalBodyShape,
      horizontalBodyShape: this.horizontalBodyShape,
      heightCategory: this.heightCategory,
      neckSizeCategory: this.neckSizeCategory,
      personality: Object.keys(agg).sort((a, b) => agg[b] - agg[a])[0],
      bmi: this.bmi,
    };
  }

  @Exclude()
  toObject() {
    return {
      id: this.id?.toString(),
      isArchived: this.isArchived,
      user: this.user,
      goals: this.goals?.toJson(),
      measurements: this.measurements.toJson(),
      fatures: this.fatures.toJson(),
      verticalBodyShape: this.verticalBodyShape,
      horizontalBodyShape: this.horizontalBodyShape,
      personalityAnswers: this.personalityAnswers,
    };
  }
}
