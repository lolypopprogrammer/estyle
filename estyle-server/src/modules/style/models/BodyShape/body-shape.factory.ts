import { Types } from 'mongoose';
import { BodyShape } from './body-shape.model';

export class BodyShapeFactory {
  static create(data?: any): BodyShape {
    const id = data._id || data.id;
    return new  BodyShape(
      data.name,
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
