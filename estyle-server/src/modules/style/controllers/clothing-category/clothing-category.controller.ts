import { Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { ClothingCategoryRepository } from '../../models/ClothingCategory/clothing-category.repository';
import { IClothingCategory } from '../../models/ClothingCategory/clothing-category.schema';
import { ClothingCategoryFactory } from '../../models/ClothingCategory/clothing-category.factory';
import { ClothingCategoryPostDto } from './dto/clothing-category-post.dto';
import { ClothingCategoryPatchDto } from './dto/clothing-category-patch.dto';
import { ClothingCategoryDto } from './dto/clothing-category.dto';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { PhotoDto } from '../item-attribute/dto/photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';

@ApiTags('Clothing Category')
@Controller('clothing-category')
export class ClothingCategoryController {
  repository: ClothingCategoryRepository;

  constructor(
    @InjectModel('ClothingCategory') ClothingCategoryModel: Model<IClothingCategory>,
    private readonly blobStorageService: BlobStorageService,
    ) {
    this.repository = new ClothingCategoryRepository(ClothingCategoryModel, blobStorageService);
  }

  @ApiCreatedResponse({
    type: ClothingCategoryDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() body: ClothingCategoryPostDto) {
    const item = ClothingCategoryFactory.create(body);
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ClothingCategoryDto,
  })
  @Get('')
  async findAll() {
    const found = await this.repository.find();
    return found.map(item => item.toJson());
  }

  @ApiCreatedResponse({
    type: ClothingCategoryDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingCategoryDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: ClothingCategoryPatchDto,
  ) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const item = ClothingCategoryFactory.create({ ...found.toObject(), ...body });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingCategoryDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async archiveById(
    @Param('id') id: string,
  ) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.repository.update(found);
  }
}