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
import { BrandItemRepository } from '../../models/BrandItem/brand-item.repository';
import { BrandItemInterface } from '../../models/BrandItem/brand-item.schema';
import { BrandItemFactory } from '../../models/BrandItem/brand-item.factory';
// import { BrandItemPostDto } from './dto/clothing-item-post.dto';
// import { BrandItemPatchDto } from './dto/clothing-item-patch.dto';
// import { BrandItemDto } from './dto/clothing-item.dto';
import { PictureDto } from './dto/picture.dto'; 
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { JsonParsePipe } from '../../../../common/pipes/json-parse.pipe';

@ApiTags('Brand Item')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('brand-item')
export class BrandItemController {
  repository:BrandItemRepository;

  constructor(
    @InjectModel('BrandItem')
    BrandItemModel: Model<BrandItemInterface>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.repository = new BrandItemRepository(BrandItemModel, blobStorageService);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: PictureDto,
  })
  @UseInterceptors(FileInterceptor('picture'))
  @Post('')
  async create(@UploadedFile() file, @Body() body: any, @Request() req: any) {
    const picture = await this.repository.uploadPhoto(file);
    const item = BrandItemFactory.create({
      ...body,
      pictures: [picture],
      author: req.user.id,
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @Get('')
  async findAll(
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
  ) {
    const parsedParams = {
      limit: Number(limit),
      skip: Number(skip),
    };
    const where: any = {};

    const found = await this.repository.find(where, parsedParams);
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @Get('my')
  async findAllMy(
    @Request() req: any,
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
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

  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @UsePipes(new JsonParsePipe('tags'))
  @UseInterceptors(FileInterceptor('picture'))
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file,
  ) {
    const found: any = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const item = BrandItemFactory.create({
      ...found,
      ...body,
      _id: found.id,
    });
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
