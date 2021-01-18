import { Types } from 'mongoose';
import { ClothingItem } from './clothing-item.model';

export class ClothingItemFactory {
  static create(data?: any): ClothingItem {
    return new ClothingItem(
      data.name,
      data.pictures,
      data.category,
      data.author,
      data.length,
      data.style,
      data.lapels,
      data.material,
      data.neckline,
      data.sleeves,
      data.Waistline,
      data.brand,
      data.ocasions,
      data.tags,
      data.notes,
      data.isFavorite,
      data.price,
      data.createdOn,
      data.isArchived || false,
      data._id && Types.ObjectId(data._id.toString()),
    );
  }
}
