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
  UsePipes
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBody, ApiTags, ApiConsumes, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Model } from 'mongoose';

import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { OutfitRepository } from '../../models/Outfit/outfit.repository';
import { OutfitInterface } from '../../models/Outfit/outfit.schema';
import { OutfitFactory } from '../../models/Outfit/outfit.factory';
import { OutfitPostDto, OutfitPatchDto, OutfitDto, PictureDto, CommentPostDto } from './dto';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { CommentRepository } from '../../models/Comment/comment.repository';
import { CommentInterface } from '../../models/Comment/comment.schema';
import { JsonParsePipe } from '../../../../common/pipes/json-parse.pipe';

@ApiTags('Outfit')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('outfit')
export class OutfitController {
  repository: OutfitRepository;
  commentRepository: CommentRepository;

  constructor(
    @InjectModel('Outfit')
    OutfitModel: Model<OutfitInterface>,
    private readonly blobStorageService: BlobStorageService,
    @InjectModel('Comment')
    private readonly CommentModel: Model<CommentInterface>,
  ) {
    this.repository = new OutfitRepository(OutfitModel, blobStorageService);
    this.commentRepository = new CommentRepository(CommentModel);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: PictureDto,
  })
  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @UseInterceptors(FileInterceptor('picture'))
  @UsePipes(new JsonParsePipe('tags'))

  @Post('')
  async createDraft(@UploadedFile() file, @Body() body: any, @Request() req: any) {
    const picture = await this.repository.uploadPhoto(file);
    const item = OutfitFactory.create({
      author: req.user.id,
      ...body,
      pictures: [picture],
      isPublic: body.isPublic === 'true',
      isLookbook: body.isLookbook === 'true',
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @ApiCreatedResponse({
    isArray: true,
    type: OutfitDto,
  })
  @Get('')
  async findAll(
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
    @Query('isPublic') isPublic?: boolean,
    @Query('search') search?: string,
    @Query('id') id?: string,
    @Query('occasionId') occasionId?: string,
    @Query('shapeId') shapeId?: string,
    @Query('styleId') styleId?: string,
    @Query('collectionId') collectionId?: string,
  ) {
    const where: any = {};
    if (isPublic) where.isPublic = isPublic;
    if (search) {
      where.name = new RegExp(`${search}`, 'i');
    }
    if (id) {
      where.author = id;
    }
    if (occasionId) {
      where.occasion = occasionId;
    }

    if (shapeId) {
      where.bodyShape = shapeId;
    }
    if (styleId) {
      where.personalStyle = styleId;
    }
    if (collectionId) {
      where.brandCollection = collectionId;
    }

    const found = await this.repository.find(where, {
      limit: Number(limit),
      skip: Number(skip),
    });
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @ApiCreatedResponse({
    isArray: true,
    type: OutfitDto,
  })
  @Get('my')
  async findAllMy(
    @Request() req: any,
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
    @Query('isPublic') isPublic?: boolean,
    @Query('isLookbook') isLookbook?: boolean,
    @Query('search') search?: string,
  ) {
    const where: any = {
      author: req.user.id,
    };
    if (isPublic) where.isPublic = isPublic;
    if (isLookbook) where.isLookbook = isLookbook;
    if (search) {
      where.name = new RegExp(`${search}`, 'i');
    }
    const found = await this.repository.find(where, {
      limit: Number(limit),
      skip: Number(skip),
    });
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @ApiCreatedResponse({
    isArray: true,
    type: OutfitDto,
  })
  @Get('liked')
  async findAllMyLiked(
    @Request() req: any,
    @Query('limit') limit: number = 6,
    @Query('skip') skip: number = 0,
  ) {
    const parseParams = () => ({
      limit: Number(limit),
      skip: Number(skip),
    });
    const where: any = { likes: { $in: [req.user.id] } };
    const found = await this.repository.find(where, parseParams());
    return {
      ...found,
      data: found.data.map((item) => item.toJson()),
    };
  }

  @Get(':id/likes')
  async findAllMyLikes(
      @Param('id') id: string
  ) {
    const found = await this.repository.getLikes(id);
    return found;
  }

  @ApiCreatedResponse({
    isArray: true,
    type: OutfitDto,
  })
  @Post(':id/like')
  async like(@Param('id') id: string, @Request() req: any) {
    const found = await this.repository.findById(id);
    let likes = [] ;
    if (found.likes.includes(req.user.id)) {      
      likes = [...found.likes.filter((user) => String(user) != req.user.id)];
    } else {
      likes = [...found.likes, req.user.id];
    }
    if (!found) throw new NotFoundException();
    const item = OutfitFactory.create({ _id: id, ...found, likes });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @Post(':id/comment')
  async createOutfitComment(
    @Request() req: any,
    @Body() body: CommentPostDto,
    @Param('id') id: string,
  ) {
    const found = await this.repository.findById(id);
    const comment = await new this.CommentModel({
      ...body,
      author: req.user.id,
    });
    await comment.save();

    if (!found) throw new NotFoundException();
    const item = OutfitFactory.create({
      _id: id,
      ...found,
      comments: found.comments.concat(comment._id),
    });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @Delete(':id/comment/:commentId')
  async deleteOutfitComment(@Param('id') id: string, @Param('commentId') commentId: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();

    const foundCommentId = found.comments.find((comment) => comment.id === commentId);
    if (!foundCommentId) throw new NotFoundException();
    await this.commentRepository.delete(commentId);

    const item = OutfitFactory.create({
      _id: id,
      ...found,
      comments: found.comments
        .filter((comment) => comment.id !== commentId)
        .map((comment) => comment.id),
    });
    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    return found.toJson();
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Formdata',
    isArray: false,
    type: PictureDto,
  })
  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @UseInterceptors(FileInterceptor('picture'))
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
      item = OutfitFactory.create({ _id: id, ...found, ...body, pictures: [picture] });
    } else {
      if (body.tags) {
        const tags = found.tags.join("").replace(/[\[\]']+/g, '').replace(/"/g, '').split(',');
        tags.push(body.tags);
        console.log(tags);
        item = OutfitFactory.create({ _id: id, ...found, ...{tags: tags} });
      } else {
        item = OutfitFactory.create({ _id: id, ...found, ...body });    
      }
    }

    const updated = await this.repository.update(item);
    return updated.toJson();
  }

  @ApiCreatedResponse({
    type: OutfitDto,
  })
  @Delete(':id')
  async archiveById(@Param('id') id: string) {
    const found = await this.repository.findById(id);
    if (!found) throw new NotFoundException();
    found.isArchived = true;
    const deleted = await this.repository.update(found);
    return deleted.toJson();
  }
}
