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
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Model } from 'mongoose';
import { ItemAttributeDto } from './dto/item-attribute.dto';
import { ItemAttributePostDto } from './dto/item-attribute-post.dto';
import { ItemAttributePatchDto } from './dto/item-attribute-patch.dto';
import { ItemAttributeRepository } from '../../models/ItemAttribute/Attribute/item-attribute.repository';
import { IItemAttribute } from '../../models/ItemAttribute/Attribute/item-attribute.schema';
import { ItemAttributeFactory } from '../../models/ItemAttribute/Attribute/item-attribute.factory';
import { IItemAttributeType } from '../../models/ItemAttribute/Type/item-attribute-type.schema';
import { ItemAttributeTypeRepository } from '../../models/ItemAttribute/Type/item-attribute-type.repository';
import { ItemAttributeTypeFactory } from '../../models/ItemAttribute/Type/item-attribute-type.factory';
import { ItemAttributeTypeDto } from './dto/item-attribute-type.dto';
import { ItemAttributeTypePostDto } from './dto/item-attribute-type-post.dto';
import { ItemAttributeTypePatchDto } from './dto/item-attribute-type-patch.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { PhotoDto } from './dto/photo.dto';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { Readable } from 'stream';

@ApiTags('Item Attribute')
@Controller('item-attribute')
export class ItemAttributeController {
  itemRepository: ItemAttributeRepository;
  typeRepository: ItemAttributeTypeRepository;

  constructor(
    @InjectModel('ItemAttribute') ItemAttributeModel: Model<IItemAttribute>,
    @InjectModel('ItemAttributeType') ItemAttributeTypeModel: Model<IItemAttributeType>,
    private readonly blobStorageService: BlobStorageService,
  ) {
    this.itemRepository = new ItemAttributeRepository(ItemAttributeModel, blobStorageService);
    this.typeRepository = new ItemAttributeTypeRepository(ItemAttributeTypeModel);
  }

  @ApiCreatedResponse({
    type: ItemAttributeTypeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('type')
  async createType(@Body() body: ItemAttributeTypePostDto) {
    const type = ItemAttributeTypeFactory.create(body);
    const created = await this.typeRepository.create(type);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ItemAttributeTypeDto,
  })
  @Get('type')
  async findAllTypes() {
    const found = await this.typeRepository.find();
    return found.map((type) => type.toJson());
  }

  @ApiCreatedResponse({
    type: ItemAttributeTypeDto,
  })
  @Get('type/:id')
  async findTypeById(@Param('id') id: string) {
    const found = await this.typeRepository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: ItemAttributeTypeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('type/:id')
  async updateTypeById(@Param('id') id: string, @Body() body: ItemAttributeTypePatchDto) {
    const found = await this.typeRepository.findById(id);
    if (!found) throw new NotFoundException();
    const type = ItemAttributeTypeFactory.create({ ...found.toObject(), ...body });
    const updated = await this.typeRepository.update(type);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: ItemAttributeTypeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('type/:id')
  async archiveTypeById(@Param('id') id: string) {
    const found = await this.typeRepository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.typeRepository.update(found);
  }

  @ApiCreatedResponse({
    type: ItemAttributeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(@Body() body: ItemAttributePostDto) {
    const item = ItemAttributeFactory.create(body);
    const created = await this.itemRepository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: ItemAttributeDto,
  })
  @Get('')
  async findAll(@Query('type') type: string) {
    const where = { type: type };

    const found = await this.itemRepository.find(where);
    return found.map((item) => item.toJson());
  }

  // @ApiCreatedResponse({
  //   isArray: true,
  //   type: ItemAttributeDto,
  // })
  // @Get('')
  // async findByType() {
  //   const found = await this.itemRepository.find();
  //   return found.map((item) => item.toJson());
  // }

  @ApiCreatedResponse({
    type: ItemAttributeDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.itemRepository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiCreatedResponse({
    type: ItemAttributeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() body: ItemAttributePatchDto) {
    const found = await this.itemRepository.findById(id);
    if (!found) throw new NotFoundException();
    const item = ItemAttributeFactory.create({ ...found.toObject(), ...body });
    const updated = await this.itemRepository.update(item);
    return updated.toJson();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: PhotoDto,
  })
  @Post('/:id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  uploadPhoto(@Param('id') id: string, @UploadedFile() file): Promise<ItemAttributeDto> {
    return this.itemRepository.uploadPhoto(id, file);
  }

  @Get('/:id/photo/:name')
  @UseInterceptors(FileInterceptor('photo'))
  async getPhoto(@Param('id') id: string, @Param('name') name: string, @Res() res) {
    const buffer = await this.itemRepository.getPhoto(name);
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

  @ApiCreatedResponse({
    type: ItemAttributeDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async archiveById(@Param('id') id: string) {
    const found = await this.itemRepository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const updated = await this.itemRepository.update(found);
  }
}
