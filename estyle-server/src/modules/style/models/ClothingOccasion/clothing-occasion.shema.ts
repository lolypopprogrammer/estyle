import { Schema, Document } from 'mongoose';

export const ClothingOccasionSchema = new Schema({
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
});

export interface ClothingOccasionInterface extends Document {
  name: string;
  pictures: string[];
  isArchived: boolean;
  createdOn: Date | string;
}
