import { Schema, Document } from 'mongoose';

export const ItemAttributeTypeSchema = new Schema(
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

export interface IItemAttributeType extends Document {
  name: string;
  isArchived: boolean;
  createdOn: Date | string;
}
