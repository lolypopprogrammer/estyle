import {
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  Param,
  Request,
  Controller,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBody, ApiTags, ApiConsumes, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';

import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { CommentRepository } from '../../models/Comment/comment.repository';
import { BrandCollectionRepository } from '../../models/BrandCollection/brand-collection.repository';
import { BrandCollectionInterface } from '../../models/BrandCollection/brand-collection.schema';
import { BrandCollectionFactory } from '../../models/BrandCollection/brand-collection.factory';

@ApiTags('Brand-collection')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('brand-collection')
export class BrandCollectionController {
  repository: BrandCollectionRepository;
  commentRepository: CommentRepository;

  constructor(
    @InjectModel('BrandCollection')
    BrandCollectionModel: Model<BrandCollectionInterface>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.repository = new BrandCollectionRepository(BrandCollectionModel, blobStorageService);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('imageCollection'))
  @Post('')
  async createDraft(@UploadedFile() file, @Body() body: any, @Request() req: any) {
    const picture = await this.repository.uploadPhoto(file);

    const item = BrandCollectionFactory.create({
      ...body,
      author: req.user.id,
      imageCollection: [picture],
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @Get('')
  async findAll(
    @Request() req: any,
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
  ) {
    const where: any = {
      author: req.user.id,
    };
    const found = await this.repository.find(where, {
      limit: Number(limit),
      skip: Number(skip),
    });
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @UseInterceptors(FileInterceptor('imageCollection'))
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() body: any,
    @Request() req: any,
  ) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    let item;
    if (file) {
      const picture = await this.repository.uploadPhoto(file);
      item = BrandCollectionFactory.create({
        _id: id,
        ...found,
        ...body,
        imageCollection: [picture],
      });
    } else {
      item = BrandCollectionFactory.create({ _id: id, ...found, ...body });
    }

    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @Delete(':id')
  async archiveById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.repository.update(found);
  }
}
