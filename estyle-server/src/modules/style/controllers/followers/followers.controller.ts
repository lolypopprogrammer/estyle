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
import { Model, Types } from 'mongoose';
import { JwtAuthGuard } from '../../../auth/guards/jwt.guard';
import { FollowersRepository } from '../../models/Followers/followers.repository';
import { FollowersInterface } from '../../models/Followers/followers.schema';
import { FollowersFactory } from '../../models/Followers/followers.factory';
import { BlobStorageService } from 'src/common/services/blob-storage.service';
import { JsonParsePipe } from '../../../../common/pipes/json-parse.pipe';

@ApiTags('Followers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('followers')
export class FollowersController {
  repository:FollowersRepository;

  constructor(
    @InjectModel('Followers')
    FollowersModel: Model<FollowersInterface>
  ) {
    this.repository = new FollowersRepository(FollowersModel);
  }

  @Post('')
  async create(@Body() body: any, @Request() req: any) {
    
    const item = FollowersFactory.create({
      ...body,
      userId: req.user.id,
    });
    const created = await this.repository.create(item);
    return created.toJson();
  }

  @Get('')
  async findAll(
      @Request() req: any
  ) {
  
    const found = await this.repository.find({'subId' : String(req.user.id)});
    return found ;
  }

  @Get('my')
  async findAllMy(
    @Request() req: any,
  ) {
    const where: any = {
      author: req.user.id,
    };

    const found = await this.repository.find(where);
    return found; 
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Request() req: any) {

    const where: any = {
        'userId': id,
        'subId' : String(req.user.id)
    };

    const found = await this.repository.find(where);
    return found;
  }


  @Delete(':id')
  async archiveById(@Param('id') id: string, @Request() req: any) {
    const found = await this.repository.find({
        'userId': id,
        'subId' : String(req.user.id)
    });
    if (!found) throw new NotFoundException();
    await this.repository.delete(found[0].id);
  }
}
