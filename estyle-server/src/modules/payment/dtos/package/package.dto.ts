import { PickType, OmitType } from '@nestjs/swagger';
import { PaymentPackage } from '../../models/package/package.model';

export class PaymentPackageDto extends OmitType(PaymentPackage, ['update', 'toJson', 'toDocument']) {}
