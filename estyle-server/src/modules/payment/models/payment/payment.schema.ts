import { Schema, Types, Document } from 'mongoose';
import { PaymentStatus } from '../../dtos/payment/payment-status.enum';

export const PaymentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  paymentPackage: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'PaymentPackage',
  },
  sku: {
    type: String,
    required: true,
  },
  status: {
    enum: Object.keys(PaymentStatus)
      .filter(k => typeof PaymentStatus[k as any] === 'number')
      .map(k => PaymentStatus[k as any]),
    type: Number,
  },
  error: String,
  orderRef: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: String,
});

export interface IPayment extends Document {
  user: string;
  paymentPackage: string;
  sku: string;
  status: PaymentStatus;
  error: string;
  orderRef: string;
  createdOn: string;
  updatedOn: string;
}
