import { Quiz } from './quiz.model';
import { Types } from 'mongoose';
import { QuizGoalFactory } from './goal/goal.factory';
import { QuizMeasurementsFactory } from './measurements/measurements.factory';
import { QuizFeaturesFactory } from './features/features.factory';

export class QuizFactory {
  static create(data: any | Partial<Quiz>) {
    const id = data._id || data.id;
    return new Quiz(
      Types.ObjectId(data.user),
      data.goals && QuizGoalFactory.create(data.goals),
      QuizMeasurementsFactory.create(data.measurements),
      QuizFeaturesFactory.create(data.fatures),
      data.personalityAnswers,
      data.isArchived || false,
      id && Types.ObjectId(id),
    );
  }
}
