import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { WardrobeCalendarPostDto } from './dto/wardrobe-calendar-post.dto';
import { WardrobeCalendarRepository } from '../../models/WardrobeCalendar/wardrobe-calendar.repository';
import { WardrobeCalendarFactory } from '../../models/WardrobeCalendar/wardrobe-calendar.factory';
import { WardrobeCalendarInterface } from '../../models/WardrobeCalendar/wardrobe-calendar.schema';
import { WardrobeCalendarDto } from './dto/wardrobe-calendar.dto';
import { WardrobeCalendarPatchDto } from './dto/wardrobe-calendar-patch.dto';

@ApiTags('Wardrobe Calendar')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wardrobe-calendar')
export class WardrobeCalendarController {
  repository: WardrobeCalendarRepository;

  constructor(
    @InjectModel('WardrobeCalendar')
    WardrobeCalendarModel: Model<WardrobeCalendarInterface>,
  ) {
    this.repository = new WardrobeCalendarRepository(WardrobeCalendarModel);
  }

  @ApiCreatedResponse({
    type: WardrobeCalendarPostDto,
  })
  @Post('')
  async create(@Body() body: WardrobeCalendarPostDto, @Request() req: any) {
    const item = WardrobeCalendarFactory.create({
      ...body,
      author: req.user.id,
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: WardrobeCalendarDto,
  })
  @Get('')
  async findAll(
    @Query('month') month: number = 1,
    @Query('year') year: number = 2020,
    @Query('id') id: string,
  ) {
    const found = await this.repository.find(id, month, year);
    return found.map((item) => item.toJson());
  }

  @Delete(':id')
  async deleteWardrobeDayOutfit(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();

    await this.repository.delete(id);
  }

  @ApiCreatedResponse({
    type: WardrobeCalendarPatchDto,
  })
  @Patch(':id')
  async updateById(
    @Body() body: WardrobeCalendarPatchDto,
    @Request() req: any,
    @Param('id') id: string,
  ) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const fields = Object.assign(
      {
        _id: id,
        author: found.author,
        outfit: found.outfit._id,
        date: found.date,
      },
      body,
    );
    const item = WardrobeCalendarFactory.create(fields);
    const updated = await this.repository.updateById(item);

    return updated.toJson();
  }
}
