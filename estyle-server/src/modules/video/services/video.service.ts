import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoPatchDto } from '../dtos/video-patch.dto';
import { VideoPostDto } from '../dtos/video-post.dto';
import { VideoRepository } from '../models/video/video.repository';
import { IVideo } from '../models/video/video.schema';
import { ReturnType } from '../../../common/dto/return-type.enum';
import { VideoDto } from '../dtos/video.dto';

@Injectable()
export class VideoService {
  private readonly repository: VideoRepository;

  constructor(
    @InjectModel('Video') VideoModel: Model<IVideo>,
  ) {
    this.repository = new VideoRepository(VideoModel);
  }

  async create(data: VideoPostDto): Promise<VideoDto> {
    const created = await this.repository.create(data);
    return created.toJson();
  }

  async update(id: string, data: VideoPatchDto): Promise<VideoDto> {
    const paymentPackage = await this.repository.update(id, data);
    if (!paymentPackage) {
      throw new BadRequestException(`Video with ID ${id} does not exist`);
    }
    return paymentPackage.toJson();
  }

  async find(match?: Partial<IVideo | any>, returnType?: ReturnType, sort?: any, limit?: number, page?: number): Promise<VideoDto[]> {
    const found = await this.repository.find(match, returnType, sort, limit, page);
    return found.map(paymentPackage => paymentPackage.toJson());
  }

  async findById(id: string): Promise<VideoDto> {
    const paymentPackage = await this.repository.findById(id);
    if (!paymentPackage) {
      throw new BadRequestException(`Video with ID ${id} does not exist`);
    }
    return paymentPackage.toJson();
  }

  async setArchived(id: string, isArchived: boolean): Promise<void> {
    const paymentPackage = await this.repository.setArchived(id, isArchived);
    if (!paymentPackage) {
      throw new BadRequestException(`Video with ID ${id} does not exist`);
    }
  }
}
