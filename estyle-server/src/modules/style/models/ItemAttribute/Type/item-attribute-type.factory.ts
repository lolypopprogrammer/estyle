import { Types } from 'mongoose';
import { ItemAttributeType } from './item-attribute-type.model';

export class ItemAttributeTypeFactory {
  static create(data?: any): ItemAttributeType {
    const id = data._id || data.id;
    return new  ItemAttributeType(
      data.name,
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
