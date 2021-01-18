import { IPaymentPackage } from './package.schema';
import { PaymentPackage } from './package.model';
import { PackageVariationFactory } from './variation/variation.factory';
import { Types } from 'mongoose';
import { ServiceFactory } from './service/service.factory';

export class PaymentPackageFactory {
  static create(data: Partial<IPaymentPackage>) {
    const id = data._id || data.id;

    return new PaymentPackage(
      data.name,
      data.paymentType,
      data.services?.map(srv => ServiceFactory.create(srv)),
      data.defaultVariation,
      data.variations.map(val => PackageVariationFactory.create(val)),
      data.isArchived || false,
      id && Types.ObjectId(id),
      data.createdOn,
    );
  }
}
