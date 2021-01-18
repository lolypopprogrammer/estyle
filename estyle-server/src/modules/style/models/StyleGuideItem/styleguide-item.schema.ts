import { Schema, Document } from 'mongoose';
import { StyleGuideItemAttributeSchema, StyleGuideIItemAttribute } from './Attributes/styleguide-item-attribute.schema';
import { HorizontalBodyShape } from '../quiz/measurements/measurements.enum';
import { ProminentFeature } from '../quiz/features/features.enum';

export const StyleGuideItemSchema = new Schema(
  {
    bodytype: [{
      type: String,
      enum: Object.keys(HorizontalBodyShape)
        .filter(k => typeof HorizontalBodyShape[k as any] === 'string')
        .map(k => HorizontalBodyShape[k as any]),
    }],
    prominentFeature: [{
      type: String,
      enum: Object.keys(ProminentFeature)
        .filter(k => typeof ProminentFeature[k as any] === 'string')
        .map(k => ProminentFeature[k as any]),
    }],
    clothingCategory: {
      type: Schema.Types.ObjectId,
      ref: 'ClothingCategory',
    },
    title: {
      type: String,
      required: 'Title is requiured',
    },
    description: {
      type: String,
      required: 'Description is requiured',
    },
    attributes: [StyleGuideItemAttributeSchema],
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

export interface IStyleGuideItem extends Document {
  bodytype: string;
  clothingCategory: string;
  title: string;
  description: string;
  attributes: StyleGuideIItemAttribute[];
  isArchived: boolean;
  createdOn: Date | string;
}
