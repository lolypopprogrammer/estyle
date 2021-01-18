import { Schema, Document, Types } from 'mongoose';

export const BrandItemSchema = new Schema({
  name: {
    type: String,
    required: 'Name is requiured',
  },
  pictures: {
    type: Array,
    required: 'Pictures are required',
  },
  
  brand: {
    type: String,
    required: 'Brand is requiured',
  },
  price: {
    type: Number,
  },
  link: {
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

export interface BrandItemInterface extends Document {
  name: string;
  pictures: string[];
  brand: string;
  price: number;
  link: string;
  isArchived: boolean;
  createdOn: Date | string;
}
