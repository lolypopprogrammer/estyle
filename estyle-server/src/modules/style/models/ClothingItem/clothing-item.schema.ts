import { Schema, Document, Types } from 'mongoose';

export const ClothingItemSchema = new Schema({
  name: {
    type: String,
    required: 'Name is requiured',
  },
  pictures: {
    type: Array,
    required: 'Pictures are required',
  },
  category: {
    type: Types.ObjectId,
    ref: 'ClothingCategory',
    required: 'Category is requiured',
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
  },
  length: {
    type: String,
  },
  waistline: {
    type: String,
  },
  style: {
    type: String,
  },
  lapels: {
    type: String,
  },
  material: {
    type: String,
  },
  neckline: {
    type: String,
  },

  sleeves: {
    type: String,
  },
  brand: {
    type: Types.ObjectId,
    ref: 'ClothingBrand',
    required: 'Brand is requiured',
  },
  ocasions: {
    type: String,
  },
  tags: {
    type: Array,
  },
  notes: {
    type: String,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Number,
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

export interface ClothingItemInterface extends Document {
  name: string;
  pictures: string[];
  category: Types.ObjectId;
  author: Types.ObjectId;
  length: string;
  style: string;
  lapels: string;
  material: string;
  neckline: string;
  sleeves: string;
  Waistline: string;
  brand: string;
  ocasions: string;
  tags: string[];
  notes: string;
  isFavorite: boolean;
  price: number;
  isArchived: boolean;
  createdOn: Date | string;
}
