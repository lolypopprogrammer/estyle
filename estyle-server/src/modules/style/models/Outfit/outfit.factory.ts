import { Types } from 'mongoose';
import { Outfit } from './outfit.model';

export class OutfitFactory {
  static create(data?: any): Outfit {
    return new Outfit(
      data.name,
      data.pictures,
      data.createdOn,
      data.isArchived || false,
      data.isPublic || false,
      data.isLookbook || false,
      data.description,
      data.tags,
      data.author,
      data.structure,
      data.likes,
      data.views,
      data.comments,
      data.brands,
      data.items,
      data.bodyShape,
      data.personalStyle,
      data.occasion,
      data.brandCollection,
      data._id && Types.ObjectId(data._id.toString()),
    );
  }
}
