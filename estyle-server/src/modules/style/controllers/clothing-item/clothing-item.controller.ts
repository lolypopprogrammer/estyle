import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { ClothingItemRepository } from '../../models/ClothingItem/clothing-item.repository';
import { ClothingItemInterface } from '../../models/ClothingItem/clothing-item.schema';
import { ClothingItemFactory } from '../../models/ClothingItem/clothing-item.factory';
import { ClothingItemPostDto } from './dto/clothing-item-post.dto';
import { ClothingItemPatchDto } from './dto/clothing-item-patch.dto';
import { ClothingItemDto } from './dto/clothing-item.dto';
import { PictureDto } from './dto';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { JsonParsePipe } from '../../../../common/pipes/json-parse.pipe';

@ApiTags('Clothing Item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clothing-item')
export class ClothingItemController {
  repository: ClothingItemRepository;

  constructor(
    @InjectModel('ClothingItem')
    ClothingItemModel: Model<ClothingItemInterface>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.repository = new ClothingItemRepository(ClothingItemModel, blobStorageService);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: PictureDto,
  })
  @ApiCreatedResponse({
    type: ClothingItemDto,
  })
  @UseInterceptors(FileInterceptor('picture'))
  @UsePipes(new JsonParsePipe('tags'))
  @Post('')
  async create(@UploadedFile() file, @Body() body: any, @Request() req: any) {
    const picture = await this.repository.uploadPhoto(file);
    const item = ClothingItemFactory.create({
      ...body,
      pictures: [picture],
      author: req.user.id,
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ClothingItemDto,
  })
  @Get('')
  async findAll(
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
    @Query('categoryId') categoryId: string,
    @Query('author') author: string,
  ) {
    const parsedParams = {
      limit: Number(limit),
      skip: Number(skip),
    };
    const where: any = {};
    if (author) {
      where.author = author;
    }
    if (categoryId) {
      where.category = categoryId;
    }

    const found = await this.repository.find(where, parsedParams);
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ClothingItemDto,
  })
  @Get('my')
  async findAllMy(
    @Request() req: any,
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
    @Query('categoryId') categoryId?: string,
    @Query('occasionName') occasionName?: string,
    // @Query('isFavorite') isFavorite?: boolean,
    // @Query('search') search?: string,
  ) {
    const parsedParams = {
      limit: Number(limit),
      skip: Number(skip),
    };
    const where: any = {
      author: req.user.id,
    };

    if (categoryId) {
      where.category = categoryId;
    }
    if (occasionName) {
      where.ocasions = occasionName;
    }

    // if (isFavorite) {
    //   where.isFavorite = isFavorite;
    // }

    // if (search) {
    //   where.name = new RegExp(`${search}`, 'i');
    // }

    const found = await this.repository.find(where, parsedParams);
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @ApiCreatedResponse({
    type: ClothingItemDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingItemPatchDto,
  })
  @UsePipes(new JsonParsePipe('tags'))
  @UseInterceptors(FileInterceptor('picture'))
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: ClothingItemPatchDto,
    @UploadedFile() file,
  ) {
    console.log(body);
    const found: any = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const item = ClothingItemFactory.create({
      ...found,
      ...body,
      _id: found.id,
    });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: ClothingItemDto,
  })
  @Delete(':id')
  async archiveById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.repository.update(found);
  }
}
