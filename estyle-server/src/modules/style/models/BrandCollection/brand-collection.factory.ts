import { Types } from 'mongoose';
import { BrandCollection } from './brand-collection.model';

export class BrandCollectionFactory {
  static create(data?: any): BrandCollection {
    return new BrandCollection(
      data.title,
      data.color,
      data.author,
      data.isArchived || false,
      data.imageCollection,
      data._id && Types.ObjectId(data._id.toString()),
    );
  }
}
