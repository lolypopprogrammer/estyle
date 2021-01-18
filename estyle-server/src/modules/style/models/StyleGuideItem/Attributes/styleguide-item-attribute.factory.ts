import { Types } from 'mongoose';
import { StyleGuideItemAttribute } from './styleguide-item-attribute.model';

export class StyleGuideItemAttributeFactory {
  static create(data?: any): StyleGuideItemAttribute {
    const id = data._id || data.id;
    return new  StyleGuideItemAttribute(
      Types.ObjectId(data.attribute.toString()),
      data.description,
      data.type,
      data.createdOn,
      data.isArchived || false,
      data.picture,
      id && Types.ObjectId(id.toString()),
    );
  }
}
