import { Model } from 'mongoose';
import { IQuiz } from './quiz.schema';
import { Quiz } from './quiz.model';
import { QuizFactory } from './quiz.factory';
import { IStyleGuideItem } from '../StyleGuideItem/styleguide-item.schema';
import { NotFoundException } from '@nestjs/common';
import { styles } from '../../styles';

export class QuizRepository {
  constructor(
    private readonly QuizModel: Model<IQuiz>,
    private readonly StyleGuideItemModel: Model<IStyleGuideItem>,
  ) {}

  async create(data: Quiz) {
    try {
      const quiz = new this.QuizModel(data);
      const saved = await quiz.save();
      return QuizFactory.create(saved);
    } catch (err) {
      throw err;
    }
  }

  async update(quiz: Partial<Quiz>) {
    try {
      const updated = await this.QuizModel.findOneAndUpdate(
        { _id: quiz.id },
        // @ts-ignore
        { $set: quiz.toObject() },
        { new: true },
      );
      return QuizFactory.create(updated);
    } catch (err) {
      throw err;
    }
  }

  async findById(id: string) {
    try {
      const found = await this.QuizModel.findOne({ _id: id, isArchived: false });
      return found && QuizFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async findForUser(user: string) {
    try {
      const found = await this.QuizModel.findOne({ user, isArchived: false });
      return found && QuizFactory.create(found);
    } catch (err) {
      throw err;
    }
  }

  async find(where: any = {}) {
    try {
      const found = await this.QuizModel.find({
        ...where,
        isArchived: false,
      });
      return found && found.map((quiz) => QuizFactory.create(quiz));
    } catch (err) {
      throw err;
    }
  }

  async generateResults(user: string) {
    const found = await this.QuizModel.findOne({ user, isArchived: false });
    if (!found) throw new NotFoundException('Quiz not found');
    const quiz = QuizFactory.create(found);
    const features = [
      quiz.fatures.bustSize,
      quiz.fatures.shoulderShape,
      quiz.fatures.shoulderSize,
    ].filter(cur => !!cur);

    const results = await this.StyleGuideItemModel.find({
      $or: [
        { bodytype: quiz.horizontalBodyShape },
        { prominentFeature: { $in: features } },
      ],
      isArchived: false,
    })
      .populate('clothingCategory')
      .populate({ path: 'attributes.attribute', populate: 'type' });
    // @ts-ignore
    // results.populate('attributes.attribute.type');
    return {
      results,
      style: styles[quiz.toJson().personality],
    };
  }
}
