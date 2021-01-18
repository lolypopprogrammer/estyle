import { Types } from 'mongoose';
import { ItemAttribute } from './item-attribute.model';

export class ItemAttributeFactory {
  static create(data?: any): ItemAttribute {
    const id = data._id || data.id;
    return new  ItemAttribute(
      data.name,
      Types.ObjectId(data.type.toString()),
      data.pictures,
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
