import { PickType } from '@nestjs/swagger';
import { PaymentPackage } from '../../models/package/package.model';

export class PaymentPackagePostDto extends PickType(PaymentPackage, [
  'name',
  'paymentType',
  'services',
]) {}
