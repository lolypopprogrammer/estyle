import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { PaymentStatus } from '../../dtos/payment/payment-status.enum';
import { Exclude } from 'class-transformer';
import { IPayment } from './payment.schema';

export class Payment {
  @ApiProperty({
    type: String,
  })
  id?: Types.ObjectId;

  @ApiProperty({
    type: String,
  })
  user: Types.ObjectId;

  @ApiProperty({
    type: String,
  })
  paymentPackage: Types.ObjectId;

  @ApiProperty()
  sku: string;

  @ApiProperty({
    type: Number,
    enum: PaymentStatus,
  })
  status: PaymentStatus;

  @ApiProperty()
  orderRef: string;

  @ApiProperty()
  createdOn: string;

  @ApiProperty()
  updatedOn: string;

  @ApiPropertyOptional()
  error?: string;

  constructor(
    user: Types.ObjectId,
    paymentPackage: Types.ObjectId,
    sku: string,
    status: PaymentStatus,
    createdOn: string,
    updatedOn: string,
    orderRef?: string,
    error?: string,
    id?: Types.ObjectId,
  ) {
    this.user = user;
    this.paymentPackage = paymentPackage;
    this.sku = sku;
    this.status = status;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
    this.orderRef = orderRef;
    this.error = error;
    this.id = id;
  }

  @Exclude()
  update(data: Partial<Payment>): void {
    Object.keys(data)
      .filter(key => data[key] !== undefined)
      .forEach((key) => {
        this[key] = data[key];
      });
  }

  @Exclude()
  toJson() {
    return {
      id: this.id,
      user: this.user,
      paymentPackage: this.paymentPackage,
      sku: this.sku,
      status: this.status,
      error: this.error,
      orderRef: this.orderRef,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
    };
  }

  @Exclude()
  toDocument(): Partial<IPayment> {
    return {
      user: this.user.toString(),
      paymentPackage: this.paymentPackage.toString(),
      sku: this.sku,
      status: this.status,
      error: this.error,
      orderRef: this.orderRef,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
    };
  }
}
