import { ClientSession, Model } from 'mongoose';
import { VideoFactory } from './video.factory';
import { Video } from './video.model';
import { IVideo } from './video.schema';
import { ReturnType } from '../../../../common/dto/return-type.enum';
import { VideoPostDto } from '../../dtos/video-post.dto';
import { VideoPatchDto } from '../../dtos/video-patch.dto';

export class VideoRepository {
  constructor(
    private readonly VideoModel: Model<IVideo>,
  ) {}

  async create(data: VideoPostDto, session?: ClientSession): Promise<Video> {
    const video = new this.VideoModel(data);
    const saved = await video.save({ session });
    return VideoFactory.create(saved);
  }

  async update(id: string, data: VideoPatchDto, session?: ClientSession): Promise<Video> {
    const found = await this.VideoModel.findById(id);
    if (!found) return null;
    const video = VideoFactory.create(found);
    video.update(data);

    const query = this.VideoModel.findByIdAndUpdate(id, { $set: video.toDocument() }, { new: true });
    if (session) {
      query.session(session);
    }
    await query;
    return video;
  }

  async updateProvided(model: Video, session?: ClientSession): Promise<Video> {
    const query = this.VideoModel.findByIdAndUpdate(model.id, { $set: model.toDocument() }, { new: true });
    if (session) {
      query.session(session);
    }
    await query;
    return model;
  }

  async find(
    filter?: Partial<IVideo | any>,
    returnType?: ReturnType,
    sort?: any,
    limit?: number,
    page?: number,
  ): Promise<Video[] | any> {
    const match = filter || {};
    switch (returnType) {
      case ReturnType.ACTIVE: {
        match.isArchived = false;
        break;
      }
      case ReturnType.INACTIVE: {
        match.isArchived = true;
        break;
      }
    }
    const query = this.VideoModel.find(match);
    if (sort) {
      query.sort(sort);
    }
    if (limit) {
      query.limit(limit);
    }
    if (page) {
      query.skip(page);
    }
    const found = await query;
    return found.map(doc => VideoFactory.create(doc));
  }

  async findById(id: string): Promise<Video> {
    const found = await this.VideoModel.findById(id);
    if (!found) return null;
    return VideoFactory.create(found);
  }

  async setArchived(id: string, isArchived: boolean, session?: ClientSession): Promise<Video> {
    const found = await this.VideoModel.findById(id);
    if (!found) return null;
    found.isArchived = isArchived;
    const query = this.VideoModel.findByIdAndUpdate(id, found);
    if (session) {
      query.session(session);
    }
    const updated = await query;
    return VideoFactory.create(updated);
  }
}
