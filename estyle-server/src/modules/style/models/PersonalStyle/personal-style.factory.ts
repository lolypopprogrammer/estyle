import { Types } from 'mongoose';
import { PersonalStyle } from './personal-style.model';

export class PersonalStyleFactory {
  static create(data?: any): PersonalStyle {
    const id = data._id || data.id;
    return new  PersonalStyle(
      data.name,
      data.createdOn,
      data.isArchived || false,
      id && Types.ObjectId(id.toString()),
    );
  }
}
