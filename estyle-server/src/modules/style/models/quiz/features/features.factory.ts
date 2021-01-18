import { QuizFeatures } from './features.model';

export class QuizFeaturesFactory {
  static create(data: Partial<QuizFeatures>) {
    return new QuizFeatures(
      data.bustSize,
      data.hasLargerArms,
      data.hasProblematicMidsection,
      data.hasLargerThighsOrHips,
      data.hasLargeLegs,
      data.shoulderSize,
      data.shoulderShape,
    );
  }
}
