import { Schema, Document } from 'mongoose';
import { AttributeType } from 'src/modules/style/controllers/styleguide-item/dto/styleguide-item-attribute-type.enum';

export const StyleGuideItemAttributeSchema = new Schema(
  {
    attribute: {
      type: Schema.Types.ObjectId,
      ref: 'ItemAttribute',
      required: true,
    },
    description: {
      type: String,
      required: 'Description is requiured',
    },
    type: {
      type: String,
      default: AttributeType.RECOMMEND,
      enum: Object.keys(AttributeType)
        .filter(k => typeof AttributeType[k as any] === 'string')
        .map(k => AttributeType[k as any]),
    },
    picture: String,
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

export interface StyleGuideIItemAttribute extends Document {
  attribute: string;
  description: string;
  picture: string;
  isArchived: boolean;
  createdOn: Date | string;
}
