import { Types } from 'mongoose';
import { ClothingOccasion } from './clothing-occasion.model';

export class ClothingOccasionFactory {
  static create(data?: any): ClothingOccasion {
    return new ClothingOccasion(
      data.name,
      data.createdOn,
      data.isArchived || false,
      data._id && Types.ObjectId(data._id.toString()),
    );
  }
}
