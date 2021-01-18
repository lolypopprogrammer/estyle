import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { StyleGoal, LookGoal, DressGoal, KnowledgeGoal, HowToGoal } from './goal.enum';
import { Exclude } from 'class-transformer';

export class QuizGoal {
  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    enum: StyleGoal,
    example: [StyleGoal.CONFIDENCE],
  })
  styleGoal: StyleGoal[];

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    enum: LookGoal,
    example: [LookGoal.YOUNGER],
  })
  lookGoal: LookGoal[];

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    enum: DressGoal,
    example: [DressGoal.AGE],
  })
  dressGoal: DressGoal[];

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    enum: KnowledgeGoal,
    example: [KnowledgeGoal.COLORS],
  })
  knowledgeGoal: KnowledgeGoal[];

  @IsArray()
  @ApiProperty({
    type: String,
    isArray: true,
    enum: HowToGoal,
    example: [HowToGoal.ACCESSORIZE],
  })
  howToGoal: HowToGoal[];

  constructor(
    styleGoal: StyleGoal[],
    lookGoal: LookGoal[],
    dressGoal: DressGoal[],
    knowledgeGoal: KnowledgeGoal[],
    howToGoal: HowToGoal[],
  ) {
    this.styleGoal = styleGoal;
    this.lookGoal = lookGoal;
    this.dressGoal = dressGoal;
    this.knowledgeGoal = knowledgeGoal;
    this.howToGoal = howToGoal;
  }

  @Exclude()
  toJson() {
    return {
      styleGoal: this.styleGoal,
      lookGoal: this.lookGoal,
      dressGoal: this.dressGoal,
      knowledgeGoal: this.knowledgeGoal,
      howToGoal: this.howToGoal,
    };
  }
}
