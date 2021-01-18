import { PickType, PartialType } from '@nestjs/swagger';
import { PaymentPackage } from '../../models/package/package.model';

export class PaymentPackagePatchDto extends PartialType(PickType(PaymentPackage, [
  'name',
  'paymentType',
  'services',
  'defaultVariation',
])) {}
