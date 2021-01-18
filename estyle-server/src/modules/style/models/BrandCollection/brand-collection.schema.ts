import { Schema, Document, Types } from 'mongoose';

export const BrandCollectionSchema = new Schema({
  title: {
    type: String,
    required: 'Name is requiured',
  },
  color: {
    type: String,
    required: 'color is requiured',
  },
  imageCollection: {
    type: Array,
    required: 'Picture are required',
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: 'Author is required',
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

export interface BrandCollectionInterface extends Document {
  title: string;
  color: string;
  imageCollection: string[];
  author: Types.ObjectId;
  isArchived: boolean;
}
