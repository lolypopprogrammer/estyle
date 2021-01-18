import { Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete, BadRequestException, UseGuards, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { StyleGuideItemRepository } from '../../models/StyleGuideItem/styleguide-item.repository';
import { IStyleGuideItem } from '../../models/StyleGuideItem/styleguide-item.schema';
import { StyleGuideItemFactory } from '../../models/StyleGuideItem/styleguide-item.factory';
import { StyleGuideItemDto } from './dto/styleguide-item.dto';
import { StyleGuideItemPostDto } from './dto/styleguide-item-post.dto';
import { StyleGuideItemPatchDto } from './dto/styleguide-item-patch.dto';
import { JwtAuthGuard } from '../../../../modules/auth/guards/jwt.guard';
import { StyleGuideItemAttributePostDto } from './dto/styleguide-item-attribute-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { Readable } from 'stream';
import { StyleGuideItemAttributePatchDto } from './dto/styleguide-item-attribute-patch.dto';

@ApiTags('Style Guide Item')
@Controller('styleguide-item')
export class StyleGuideItemController {
  repository: StyleGuideItemRepository;

  constructor(
    @InjectModel('StyleGuideItem') StyleGuideItemModel: Model<IStyleGuideItem>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.repository = new StyleGuideItemRepository(StyleGuideItemModel, blobStorageService);
  }

  @ApiCreatedResponse({
    type: StyleGuideItemDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() body: StyleGuideItemPostDto) {
    const group = StyleGuideItemFactory.create(body);
    const created = await this.repository.create(group);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: StyleGuideItemDto,
  })
  @Get('')
  async findAll() {
    const found = await this.repository.find();
    return found.map(group => group.toJson());
  }

  @ApiCreatedResponse({
    type: StyleGuideItemDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: StyleGuideItemDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() body: StyleGuideItemPatchDto,
  ) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    const group = StyleGuideItemFactory.create({ ...found.toObject(), ...body });
    const updated = await this.repository.update(group);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: StyleGuideItemDto,
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

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: StyleGuideItemAttributePostDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('picture'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: StyleGuideItemDto,
  })
  @Post(':itemId/attribute')
  async createStyleguideItemAttribute(
    @Param('itemId') itemId: string,
    @Body() data: StyleGuideItemAttributePostDto,
    @UploadedFile() file,
  ) {
    try {
      return this.repository.createAttribute(itemId, data, file);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: StyleGuideItemAttributePatchDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('picture'))
  @ApiCreatedResponse({
    type: StyleGuideItemDto,
  })
  @Patch(':itemId/attribute')
  async updateStyleguideItemAttribute(
    @Param('itemId') itemId: string,
    @Body() data: StyleGuideItemAttributePatchDto,
    @UploadedFile() file,
  ) {
    try {
      return this.repository.updateAttribute(itemId, data, file);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: StyleGuideItemDto,
  })
  @Delete(':itemId/attribute/:id')
  async removeStyleguideItemAttribute(
    @Param('itemId') itemId: string,
    @Param('id') id: string,
  ) {
    try {
      return this.repository.removeAttribute(itemId, id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  @Get('/photo/:name')
  async getPhoto(
    @Param('name') name: string,
    @Res() res,
  ) {
    const buffer = await this.repository.getPhoto(name);
    if (!buffer) {
      throw new NotFoundException();
    }
    const split = name.split('.');
    const ext = split[split.length - 1];
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    res.set({
      'Content-Length': buffer.length,
      'Content-Type': `image/${ext === 'png' ? ext : 'jpeg'}`,
    });
    stream.pipe(res);
  }
}
