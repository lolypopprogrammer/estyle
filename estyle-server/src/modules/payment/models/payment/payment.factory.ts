import { Types } from 'mongoose';
import { IPayment } from './payment.schema';
import { Payment } from './payment.model';

export class PaymentFactory {
  static create(data: Partial<IPayment>) {
    const id = data._id || data.id;
    return new Payment(
      Types.ObjectId(data.user),
      Types.ObjectId(data.paymentPackage),
      data.sku,
      data.status,
      data.createdOn,
      data.updatedOn,
      data.orderRef,
      data.error,
      id && Types.ObjectId(id),
    );
  }
}
