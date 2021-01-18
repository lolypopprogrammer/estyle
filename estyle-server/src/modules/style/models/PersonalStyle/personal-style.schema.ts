import { Schema, Document } from 'mongoose';

export const PersonalStyleSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is requiured',
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
);

export interface PersonalStyleInterface extends Document {
  name: string;
  isArchived: boolean;
  createdOn: Date | string;
}
