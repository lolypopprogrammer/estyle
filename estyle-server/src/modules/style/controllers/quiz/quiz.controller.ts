import { Controller, Post, Body, UseGuards, Get, NotFoundException } from '@nestjs/common';
import { Quiz } from '../../models/quiz/quiz.model';
import { QuizFactory } from '../../models/quiz/quiz.factory';
import { ApiBody, ApiCreatedResponse, ApiTags, ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { QuizPostDto } from './quiz.dto';
import { CurrentUser } from '../../../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt.guard';
import { QuizRepository } from '../../models/quiz/quiz.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IQuiz } from '../../models/quiz/quiz.schema';
import { StyleGuideItemRepository } from '../../models/StyleGuideItem/styleguide-item.repository';
import { IStyleGuideItem } from '../../models/StyleGuideItem/styleguide-item.schema';
import { StyleGuideItem } from '../../models/StyleGuideItem/styleguide-item.model';
import { StyleGuideItemDto } from '../styleguide-item/dto/styleguide-item.dto';
import { StyleGuideItemPopulatedDto } from '../styleguide-item/dto/styleguide-item-populated.dto';

@ApiTags('Quiz')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('quiz')
export class QuizController {
  repository: QuizRepository;
  itemRepository: StyleGuideItemRepository;

  constructor(
    @InjectModel('Quiz') QuizModel: Model<IQuiz>,
    @InjectModel('StyleGuideItem') StyleGuideItemModel: Model<IStyleGuideItem>,
  ) {
    this.repository = new QuizRepository(QuizModel, StyleGuideItemModel);
  }

  @ApiCreatedResponse({
    type: Quiz,
  })
  @ApiBody({
    type: QuizPostDto,
  })
  @Post()
  async submitQuiz(@Body() body: QuizPostDto, @CurrentUser() user) {
    const existing = await this.repository.findForUser(user.id);
    if (existing) {
      existing.isArchived = true;
      await this.repository.update(existing);
    }
    const quiz = QuizFactory.create({
      ...body,
      user: user.id,
    });
    const saved = await this.repository.create(quiz);
    return saved.toJson();
  }

  @ApiOkResponse({
    type: Quiz,
  })
  @Get('me')
  async getQuiz(@CurrentUser() user) {
    const found = await this.repository.findForUser(user.id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiOkResponse({
    type: StyleGuideItemPopulatedDto,
    isArray: true,
  })
  @Get('results')
  async getQuizResults(@CurrentUser() user) {
    return this.repository.generateResults(user.id);
  }
}
