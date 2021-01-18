import { Types } from 'mongoose';
import { Video } from './video.model';
import { IVideo } from './video.schema';

export class VideoFactory {
  static create(data: Partial<IVideo>) {
    const id = data._id || data.id;

    return new Video(
      data.url,
      data.thumbnail,
      data.title,
      data.privacy,
      data.createdOn,
      data.updatedOn,
      data.isArchived,
      data.isPrimary,
      data.description,
      data.transcript,
      id && Types.ObjectId(id),
    );
  }
}
