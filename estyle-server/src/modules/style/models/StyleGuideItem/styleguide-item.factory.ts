import { Types } from 'mongoose';
import { StyleGuideItem } from './styleguide-item.model';
import { StyleGuideItemAttributeFactory } from './Attributes/styleguide-item-attribute.factory';

export class StyleGuideItemFactory {
  static create(data?: any): StyleGuideItem {
    const id = data._id || data.id;
    return new  StyleGuideItem(
      data.bodytype,
      data.prominentFeature,
      data.clothingCategory && Types.ObjectId(data.clothingCategory.toString()),
      data.title,
      data.description,
      data.attributes?.map(attr => StyleGuideItemAttributeFactory.create(attr)),
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
