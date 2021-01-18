import { Schema, Document } from 'mongoose';

export const ClothingCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is requiured',
    },
    attributeTypes: [{
      type: Schema.Types.ObjectId,
      ref: 'ItemAttributeType',
    }],
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

export interface IClothingCategory extends Document {
  name: string;
  isArchived: boolean;
  createdOn: Date | string;
}
