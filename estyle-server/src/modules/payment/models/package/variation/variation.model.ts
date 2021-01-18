import { IsString, IsNumberString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Types } from 'mongoose';
import { Service } from '../service/service.model';
import { VariationInterval } from 'src/modules/payment/dtos/package/interval.enum';

export class PackageVariation {
  @Exclude()
  id?: Types.ObjectId;

  @IsString()
  @ApiProperty()
  name: string;

  @IsNumberString(undefined, { maxDecimalPlaces: 2 })
  @ApiProperty({
    description: 'Should be sent rounded to 2 decimal points',
  })
  price: string;

  @IsEnum(VariationInterval)
  @ApiProperty({
    type: Number,
    enum: VariationInterval,
  })
  interval: VariationInterval;

  @IsString()
  @ApiProperty()
  sku: string;

  @IsArray()
  @ValidateNested()
  @ApiProperty({
    type: Service,
    isArray: true,
  })
  services: Service[];

  @ApiProperty()
  isArchived: boolean;

  @ApiProperty()
  createdOn: string;

  constructor(
    name: string,
    price: string,
    interval: VariationInterval,
    sku: string,
    services: Service[],
    isArchived: boolean,
    id?: Types.ObjectId,
    createdOn?: string,
  ) {
    this.name = name;
    this.price = price;
    this.interval = interval;
    this.sku = sku;
    this.services = services;
    this.isArchived = isArchived;
    this.id = id;
    this.createdOn = createdOn;
  }

  @Exclude()
  update(data: Partial<PackageVariation>): void {
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
      price: this.price,
      interval: this.interval,
      sku: this.sku,
      services: this.services?.map(srv => srv.toJson()),
      isArchived: this.isArchived,
      id: this.id,
      createdOn: this.createdOn,
    };
  }

  @Exclude()
  toDocument(): any {
    return {
      _id: this.id,
      name: this.name,
      price: this.price,
      interval: this.interval,
      sku: this.sku,
      services: this.services?.map(srv => srv.toDocument()),
      isArchived: this.isArchived,
      createdOn: this.createdOn,
    };
  }
}
