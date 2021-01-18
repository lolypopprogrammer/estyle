import { Types } from 'mongoose';
import { ClothingCategory } from './clothing-category.model';

export class ClothingCategoryFactory {
  static create(data?: any): ClothingCategory {
    const id = data._id || data.id;
    return new  ClothingCategory(
      data.name,
      data.attributeTypes?.map(type => Types.ObjectId(type)),
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
