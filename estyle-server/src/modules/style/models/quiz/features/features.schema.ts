import { Schema } from 'mongoose';
import { FeatureBustSize, FeatureShoulderSize, FeatureShoulderShape } from './features.enum';

export const QuizFeaturesSchema = new Schema({
  bustSize: {
    type: String,
    enum: Object.keys(FeatureBustSize)
      .filter(k => typeof FeatureBustSize[k as any] === 'string')
      .map(k => FeatureBustSize[k as any]),
  },
  hasLargerArms: {
    type: Boolean,
    default: false,
  },
  hasProblematicMidsection: {
    type: Boolean,
    default: false,
  },
  hasLargerThighsOrHips: {
    type: Boolean,
    default: false,
  },
  hasLargeLegs: {
    type: Boolean,
    default: false,
  },
  shoulderSize: {
    type: String,
    enum: Object.keys(FeatureShoulderSize)
      .filter(k => typeof FeatureShoulderSize[k as any] === 'string')
      .map(k => FeatureShoulderSize[k as any]),
  },
  shoulderShape: {
    type: String,
    enum: Object.keys(FeatureShoulderShape)
      .filter(k => typeof FeatureShoulderShape[k as any] === 'string')
      .map(k => FeatureShoulderShape[k as any]),
  },
});

export interface IQuizFeatures {
  bustSize: FeatureBustSize;
  hasLargerArms: boolean;
  hasProblematicMidsection: boolean;
  hasLargerThighsOrHips: boolean;
  hasLargeLegs: boolean;
  shoulderSize: FeatureShoulderSize;
  shoulderShape: FeatureShoulderShape;
}
