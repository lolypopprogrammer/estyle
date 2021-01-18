import { Schema, Document } from 'mongoose';
import { StyleGoal, LookGoal, DressGoal, KnowledgeGoal, HowToGoal } from './goal.enum';

export const QuizGoalSchema = new Schema(
  {
    styleGoal: [{
      type: String,
      enum: Object.keys(StyleGoal)
        .filter(k => typeof StyleGoal[k as any] === 'string')
        .map(k => StyleGoal[k as any]),
    }],
    lookGoal: [{
      type: String,
      enum: Object.keys(LookGoal)
        .filter(k => typeof LookGoal[k as any] === 'string')
        .map(k => LookGoal[k as any]),
    }],
    dressGoal: [{
      type: String,
      enum: Object.keys(DressGoal)
        .filter(k => typeof DressGoal[k as any] === 'string')
        .map(k => DressGoal[k as any]),
    }],
    knowledgeGoal: [{
      type: String,
      enum: Object.keys(KnowledgeGoal)
        .filter(k => typeof KnowledgeGoal[k as any] === 'string')
        .map(k => KnowledgeGoal[k as any]),
    }],
    howToGoal: [{
      type: String,
      enum: Object.keys(HowToGoal)
        .filter(k => typeof HowToGoal[k as any] === 'string')
        .map(k => HowToGoal[k as any]),
    }],
  },
);

export interface IQuizGoal extends Document {
  styleGoal: StyleGoal[];
  lookGoal: LookGoal[];
  dressGoal: DressGoal[];
  knowledgeGoal: KnowledgeGoal[];
  howToGoal: HowToGoal[];
}
