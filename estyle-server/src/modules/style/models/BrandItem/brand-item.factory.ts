import { Types } from 'mongoose';
import { BrandItem } from './brand-item.model';

export class BrandItemFactory {
  static create(data?: any): BrandItem {
    return new BrandItem(
      data.name,
      data.pictures,
      data.brand,
      data.link,
      data.price,
      data.createdOn,
      data.isArchived || false,
      data._id && Types.ObjectId(data._id.toString()),
    );
  }
}
