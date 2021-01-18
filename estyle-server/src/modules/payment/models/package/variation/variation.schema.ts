import { Schema, Document } from 'mongoose';
import { VariationInterval } from 'src/modules/payment/dtos/package/interval.enum';
import { IService, ServiceSchema } from '../service/service.schema';

export const PackageVariationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  interval: {
    type: Number,
    default: 1,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  services: [ServiceSchema],
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export interface IPackageVariation extends Document {
  name: string;
  price: string;
  interval: VariationInterval;
  sku: string;
  services: IService[];
  isArchived: boolean;
  createdOn: string;
}
