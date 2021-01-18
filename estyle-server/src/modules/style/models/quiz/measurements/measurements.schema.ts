import { Schema, Document } from 'mongoose';

export const QuizMeasurementsSchema = new Schema({
  height: {
    type: Number,
    required: 'Height is required',
  },
  weight: {
    type: Number,
    required: 'Weight is required',
  },
  shoulderSize: {
    type: Number,
    required: 'Shoulder size is required',
  },
  bustSize: {
    type: Number,
    required: 'Bust Size is required',
  },
  waistSize: {
    type: Number,
    required: 'Waist Size is required',
  },
  hipSize: {
    type: Number,
    required: 'Hip Size is required',
  },
  wristSize: {
    type: Number,
    required: 'Wrist Size is required',
  },
  ankleSize: {
    type: Number,
    required: 'Ankle Size is required',
  },
  headToBustSize: {
    type: Number,
    required: 'Head To Bust Size is required',
  },
  bustToHipSize: {
    type: Number,
    required: 'Bust To Hip Size is required',
  },
  hipToKneeSize: {
    type: Number,
    required: 'Hip To Knee Size is required',
  },
  kneeToFloorSize: {
    type: Number,
    required: 'Hip To Floor Size is required',
  },
  neckSize: {
    type: Number,
    required: 'Neck Size is required',
  },
});

export interface IQuizMeasurements extends Document {
  height: number;
  weight: number;
  shoulderSize: number;
  bustSize: number;
  waistSize: number;
  hipSize: number;
  wristSize: number;
  ankleSize: number;
  headToBustSize: number;
  bustToHipSize: number;
  hipToKneeSize: number;
  kneeToFloorSize: number;
  neckSize: number;
}
