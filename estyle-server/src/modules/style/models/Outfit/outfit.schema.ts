import { Schema, Document, Types } from 'mongoose';

export const OutfitSchema = new Schema({
  name: {
    type: String,
    required: 'Name is required',
  },
  pictures: {
    type: Array,
    required: 'Pictures are required',
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  isLookbook: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
  author: {
    type: Types.ObjectId,
    ref: 'User',
    required: 'Author is required',
  },
  structure: {
    type: String,
    default: false,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  views: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: Types.ObjectId,
      ref: 'Comment',
    },
  ],
  brands: {
    type: Array,
    ref: 'Brand',
  },
  items: {
    type: Array,
    ref: 'ClothingItem',
  },

  bodyShape: {
    type: Types.ObjectId,
    ref: 'BodyShape',
  },

  personalStyle: {
    type: Types.ObjectId,
    ref: 'PersonalStyle',
  },

  occasion: {
    type: Types.ObjectId,
    ref: 'ClothingOccasion',
  },
  tags: {
    type: Array,
  },

  brandCollection: {
    type: Types.ObjectId,
    ref: 'brandCollection',
  },

  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export interface OutfitInterface extends Document {
  name: string;
  pictures: string[];
  isArchived: boolean;
  createdOn: Date | string;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  views: Types.ObjectId[];
  comments: Types.ObjectId[];
  brands: Types.ObjectId[];
  items: Types.ObjectId[];
  tags: string[];

}
