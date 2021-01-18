import { Injectable, BadRequestException } from '@nestjs/common';
import { PaymentPackageRepository } from '../models/package/package.repository';
import { IPaymentPackage } from '../models/package/package.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentPackagePostDto } from '../dtos/package/package-post.dto';
import { PaymentPackagePatchDto } from '../dtos/package/package-patch.dto';
import { ReturnType } from 'src/common/dto/return-type.enum';
import { PaymentPackageDto } from '../dtos/package/package.dto';
import { PackageVariation } from '../models/package/variation/variation.model';
import { IPackageVariation } from '../models/package/variation/variation.schema';
import { PackageVariationFactory } from '../models/package/variation/variation.factory';

@Injectable()
export class PaymentPackageService {
  private readonly repository: PaymentPackageRepository;

  constructor(
    @InjectModel('PaymentPackage') PaymentPackageModel: Model<IPaymentPackage>,
  ) {
    this.repository = new PaymentPackageRepository(PaymentPackageModel);
  }

  async create(data: PaymentPackagePostDto): Promise<PaymentPackageDto> {
    const created = await this.repository.create(data);
    return created.toJson();
  }

  async update(id: string, data: PaymentPackagePatchDto): Promise<PaymentPackageDto> {
    const paymentPackage = await this.repository.update(id, data);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
    return paymentPackage.toJson();
  }

  async find(match?: Partial<IPaymentPackage>, returnType?: ReturnType): Promise<PaymentPackageDto[]> {
    const found = await this.repository.find(match, returnType);
    return found.map(paymentPackage => paymentPackage.toJson());
  }

  async findById(id: string): Promise<PaymentPackageDto> {
    const paymentPackage = await this.repository.findById(id);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
    return paymentPackage.toJson();
  }

  async setArchived(id: string, isArchived: boolean): Promise<void> {
    const paymentPackage = await this.repository.setArchived(id, isArchived);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
  }

  async addVariation(id: string, variation: Partial<IPackageVariation>): Promise<PaymentPackageDto> {
    const paymentPackage = await this.repository.findById(id);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
    await this.validateSku(variation.sku);
    paymentPackage.variations.push(PackageVariationFactory.create(variation));
    const updated = await this.repository.updateProvided(paymentPackage);
    return updated.toJson();
  }

  async updateVariation(id: string, variationId: string, data: Partial<IPackageVariation>): Promise<PaymentPackageDto> {
    const paymentPackage = await this.repository.findById(id);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
    const index = paymentPackage.variations.findIndex(vari => vari.id.equals(variationId));
    if (index === -1) {
      throw new BadRequestException(`PaymentPackageVariation with ID ${variationId} does not exist`);
    }
    paymentPackage.variations[index].update(data);
    const updated = await this.repository.updateProvided(paymentPackage);
    return updated.toJson();
  }

  async setArchivedForVariation(id: string, variationId: string, isArchived: boolean): Promise<void> {
    const paymentPackage = await this.repository.setArchived(id, isArchived);
    if (!paymentPackage) {
      throw new BadRequestException(`PaymentPackage with ID ${id} does not exist`);
    }
    const index = paymentPackage.variations.findIndex(vari => vari.id.equals(variationId));
    if (index === -1) {
      throw new BadRequestException(`PaymentPackageVariation with ID ${variationId} does not exist`);
    }
    paymentPackage.variations[index].isArchived = isArchived;
    await this.repository.updateProvided(paymentPackage);
  }

  private async validateSku(sku: string) {
    const [found] = await this.repository.find({
      'variations.sku': sku,
    });
    if (found) {
      throw new BadRequestException('SKU is already used. Please use another one');
    }
  }
}
