import { OmitType, PartialType } from '@nestjs/swagger';
import { PackageVariation } from '../../models/package/variation/variation.model';

export class PaymentPackageVariationPatchDto extends PartialType(OmitType(
  PackageVariation,
  ['id', 'createdOn', 'isArchived', 'sku', 'price', 'update'],
)) {}
