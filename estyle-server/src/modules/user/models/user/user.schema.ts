import { Schema, Document } from 'mongoose';
import { UserRole } from '../../dto/role.enum';

export const UserSchema = new Schema({
  email: {
    type: String,
    required: 'Email is required',
    unique: true,
  },
  password: {
    type: String,
    required: 'Password is required',
  },
  thumbnailBrandData: {
    type: Array,
  },
  backgroundBrandData: {
    type: Array,
  },
  firstSliderPicture: {
    type: Array,
  },
  secondSliderPicture: {
    type: Array,
  },
  thirdSliderPicture: {
    type: Array,
  },
  role: {
    type: String,
    enum: Object.keys(UserRole)
      .filter((k) => typeof UserRole[k as any] === 'string')
      .map((k) => UserRole[k as any]),
    default: UserRole.STANDARD,
  },
  firstName: {
    type: String,
    required: 'First name is required',
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: 'Last name is required',
    trim: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    trim: true,
    default: 'User',
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
});
UserSchema.set('toObject', {
  virtuals: true,
});

export interface IUser extends Document {
  email: string;
  thumbnailBrandData: string[];
  backgroundBrandData: string[];
  password: string;
  firstName: string;
  middleName?: string;
  firstSliderPicture?: string[];
  secondSliderPicture?: string[];
  thirdSliderPicture?: string[];
  lastName: string;
  createdOn: string;
  isArchived: boolean;
  status: string;
  type: string;
}
