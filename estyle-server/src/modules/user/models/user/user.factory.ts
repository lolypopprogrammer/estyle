import { User } from './user.model';
import { Types } from 'mongoose';

export class UserFactory {
  static create(data?: Partial<User> | any) {
    return new User(
      data.email,
      data.password,
      data.role,
      data.firstName,
      data.lastName,
      data.middleName,
      data.createdOn,
      data.isArchived || false,
      data.id && Types.ObjectId(data.id.toString()),
      data.status,
      data.type,
      data.thumbnailBrandData,
      data.backgroundBrandData,
      data.firstSliderPicture,
      data.secondSliderPicture,
      data.thirdSliderPicture,
    );
  }
}