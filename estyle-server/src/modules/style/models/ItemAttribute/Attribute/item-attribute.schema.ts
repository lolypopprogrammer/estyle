import { Schema, Document } from 'mongoose';

export const ItemAttributeSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is requiured',
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ItemAttributeType',
      required: 'Type is required',
    },
    pictures: {
      type: Array,
      required: 'Pictures are required',
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

export interface IItemAttribute extends Document {
  name: string;
  type: string;
  pictures: string[];
  isArchived: boolean;
  createdOn: Date | string;
}
