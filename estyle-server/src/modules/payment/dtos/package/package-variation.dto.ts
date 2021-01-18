import { OmitType } from '@nestjs/swagger';
import { PackageVariation } from '../../models/package/variation/variation.model';

export class PaymentPackageVariationDto extends OmitType(PackageVariation, ['id', 'createdOn', 'isArchived', 'update']) {}
