import { Schema, Document } from 'mongoose';
import { QuizGoalSchema, IQuizGoal } from './goal/goal.schema';
import { QuizMeasurementsSchema, IQuizMeasurements } from './measurements/measurements.schema';
import { QuizFeaturesSchema, IQuizFeatures } from './features/features.schema';
import { VerticalBodyShape, HorizontalBodyShape } from './measurements/measurements.enum';
import { PersonalityAnswer } from './peronaility-answer.enum';

export const QuizSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'User is required',
  },
  goals: {
    type: QuizGoalSchema,
    required: true,
  },
  measurements: {
    type: QuizMeasurementsSchema,
    required: true,
  },
  fatures: {
    type: QuizFeaturesSchema,
    required: true,
  },
  verticalBodyShape: {
    type: String,
    enum: Object.keys(VerticalBodyShape)
      .filter(k => typeof VerticalBodyShape[k as any] === 'string')
      .map(k => VerticalBodyShape[k as any]),
  },
  horizontalBodyShape: {
    type: String,
    enum: Object.keys(HorizontalBodyShape)
      .filter(k => typeof HorizontalBodyShape[k as any] === 'string')
      .map(k => HorizontalBodyShape[k as any]),
  },
  personalityAnswers: [{
    type: String,
    enum: Object.keys(PersonalityAnswer)
      .filter(k => typeof PersonalityAnswer[k as any] === 'string')
      .map(k => PersonalityAnswer[k as any]),
  }],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

export interface IQuiz extends Document {
  user: string;
  goals: IQuizGoal;
  measurements: IQuizMeasurements;
  fatures: IQuizFeatures;
  personalityAnswers: PersonalityAnswer[];
  createdOn: string;
  isArchived: boolean;
}
