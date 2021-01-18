import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Patch,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { ClothingOccasionRepository } from '../../models/ClothingOccasion/clothing-occasion.repository';
import { ClothingOccasionInterface } from '../../models/ClothingOccasion/clothing-occasion.shema';
import { ClothingOccasionDto } from './dto/clothing-occasion.dto';
import { ClothingOccasionPostDto } from './dto/clothing-occasion-post.dto';
import { ClothingOccasionFactory } from '../../models/ClothingOccasion/clothing-occasion.factory';
import { ClothingOccasionPatchDto } from './dto/clothing-occasion-patch.dto';

@ApiTags('Clothing Occasion')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clothing-occasion')
export class ClothingOccasionController {
  repository: ClothingOccasionRepository;

  constructor(
    @InjectModel('ClothingOccasion')
    ClothingOccasionModel: Model<ClothingOccasionInterface>,
  ) {
    this.repository = new ClothingOccasionRepository(ClothingOccasionModel);
  }

  @ApiCreatedResponse({
    type: ClothingOccasionDto,
  })
  @Post('')
  async create(@Body() body: ClothingOccasionPostDto) {
    const item = ClothingOccasionFactory.create(body);
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ClothingOccasionDto,
  })
  @Get('')
  async findAll() {
    const found = await this.repository.find();
    return found.map((item) => item.toJson());
  }

  @ApiCreatedResponse({
    type: ClothingOccasionDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingOccasionDto,
  })
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() body: ClothingOccasionPatchDto) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const item = ClothingOccasionFactory.create({ _id: found.id, ...found, ...body });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingOccasionDto,
  })
  @Delete(':id')
  async archiveById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.repository.update(found);
  }
}
