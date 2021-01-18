import { PickType } from '@nestjs/swagger';
import { Quiz } from '../../models/quiz/quiz.model';

export class QuizPostDto extends PickType(Quiz, ['measurements', 'fatures', 'personalityAnswers']) {}
