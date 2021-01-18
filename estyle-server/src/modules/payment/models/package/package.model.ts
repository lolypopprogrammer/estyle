import { IsString, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PackagePaymentType } from './package-payment-type.enum';
import { PackageVariation } from './variation/variation.model';
import { Types } from 'mongoose';
import { Exclude } from 'class-transformer';
import { IPaymentPackage } from './package.schema';
import { Service } from './service/service.model';

export class PaymentPackage {
  @ApiProperty({
    type: String,
  })
  id?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(PackagePaymentType)
  @ApiProperty({
    enum: PackagePaymentType,
    type: String,
  })
  paymentType: PackagePaymentType;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    type: Service,
    isArray: true,
  })
  services: Service[];

  @IsString()
  @ApiProperty()
  defaultVariation?: string;

  @IsArray()
  @ValidateNested()
  variations?: PackageVariation[];

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty()
  createdOn?: string;

  constructor(
    name: string,
    paymentType: PackagePaymentType,
    services: Service[],
    defaultVariation: string,
    variations: PackageVariation[],
    isArchived: boolean,
    id?: Types.ObjectId,
    createdOn?: string,
  ) {
    this.name = name;
    this.paymentType = paymentType;
    this.services = services;
    this.defaultVariation = defaultVariation;
    this.variations = variations;
    this.isArchived = isArchived;
    this.id = id;
    this.createdOn = createdOn;
  }

  @Exclude()
  update(data: Partial<PaymentPackage>): void {
    Object.keys(data)
      .filter(key => data[key] !== undefined)
      .forEach((key) => {
        this[key] = data[key];
      });
  }

  @Exclude()
  toJson() {
    return {
      name: this.name,
      paymentType: this.paymentType,
      services: this.services?.map(srv => srv.toJson()),
      defaultVariation: this.defaultVariation,
      variations: this.variations,
      isArchived: this.isArchived,
      id: this.id,
      createdOn: this.createdOn,
    };
  }

  @Exclude()
  toDocument(): Partial<IPaymentPackage> {
    return {
      name: this.name,
      paymentType: this.paymentType,
      services: this.services?.map(srv => srv.toDocument()),
      defaultVariation: this.defaultVariation,
      variations: this.variations.map(val => val.toDocument()),
      isArchived: this.isArchived,
    };
  }
}
