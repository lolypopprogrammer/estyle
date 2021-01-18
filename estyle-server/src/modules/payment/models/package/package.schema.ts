import { Schema, Document } from 'mongoose';
import { PackagePaymentType } from './package-payment-type.enum';
import { IService, ServiceSchema } from './service/service.schema';
import { IPackageVariation, PackageVariationSchema } from './variation/variation.schema';

export const PaymentPackageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
    enum: Object.keys(PackagePaymentType)
      .filter(k => typeof PackagePaymentType[k as any] === 'string')
      .map(k => PackagePaymentType[k as any]),
  },
  services: [ServiceSchema],
  defaultVariation: {
    type: String,
  },
  variations: [PackageVariationSchema],
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export interface IPaymentPackage extends Document {
  name: string;
  paymentType: PackagePaymentType;
  services: IService[];
  defaultVariation?: string;
  variations?: IPackageVariation[];
  isArchived: boolean;
  createdOn: string;
}
