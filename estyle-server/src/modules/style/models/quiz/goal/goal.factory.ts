import { QuizGoal } from './goal.model';

export class QuizGoalFactory {
  static create(data: any) {
    return new QuizGoal(
      data.styleGoal,
      data.lookGoal,
      data.dressGoal,
      data.knowledgeGoal,
      data.howToGoal,
    );
  }
}
