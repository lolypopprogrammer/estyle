import { Model, ClientSession } from 'mongoose';
import { IPaymentPackage } from './package.schema';
import { PaymentPackage } from './package.model';
import { PaymentPackageFactory } from './package.factory';
import { PaymentPackagePostDto } from '../../dtos/package/package-post.dto';
import { PaymentPackagePatchDto } from '../../dtos/package/package-patch.dto';
import { ReturnType } from 'src/common/dto/return-type.enum';
import { BadRequestException } from '@nestjs/common';

export class PaymentPackageRepository {
  constructor(
    private readonly PaymentPackageModel: Model<IPaymentPackage>,
  ) {}

  async create(data: PaymentPackagePostDto, session?: ClientSession): Promise<PaymentPackage> {
    const validation = new this.PaymentPackageModel(data);
    const saved = await validation.save({ session });
    return PaymentPackageFactory.create(saved);
  }

  async update(id: string, data: PaymentPackagePatchDto, session?: ClientSession): Promise<PaymentPackage> {
    const found = await this.PaymentPackageModel.findById(id);
    if (!found) return null;
    const paymentPackage = PaymentPackageFactory.create(found);
    if (data.defaultVariation) {
      const variation = paymentPackage.variations.find(vari => vari.sku === data.defaultVariation);
      if (!variation) {
        throw new BadRequestException('Invalid defaulVariation. SKU not found');
      }
    }
    paymentPackage.update(data);

    const query = this.PaymentPackageModel.findByIdAndUpdate(
      id,
      { $set: paymentPackage.toDocument() },
      { new: true },
    );
    if (session) {
      query.session(session);
    }
    await query;
    return paymentPackage;
  }

  async updateProvided(model: PaymentPackage, session?: ClientSession): Promise<PaymentPackage> {
    const query = this.PaymentPackageModel.findByIdAndUpdate(
      model.id,
      { $set: model.toDocument() },
      { new: true },
    );
    if (session) {
      query.session(session);
    }
    await query;
    return model;
  }

  async find(filter?: Partial<IPaymentPackage | any>, returnType?: ReturnType): Promise<PaymentPackage[] | any> {
    const match = filter || {};
    switch (returnType) {
      case ReturnType.ACTIVE: {
        match.isArchived = false;
        break;
      }
      case ReturnType.INACTIVE: {
        match.isArchived = true;
        break;
      }
    }
    const found = await this.PaymentPackageModel.find(match);
    return found.map(doc => PaymentPackageFactory.create(doc));
  }

  async findById(id: string): Promise<PaymentPackage> {
    const found = await this.PaymentPackageModel.findById(id);
    if (!found) return null;
    return PaymentPackageFactory.create(found);
  }

  async setArchived(id: string, isArchived: boolean, session?: ClientSession): Promise<PaymentPackage> {
    const found = await this.PaymentPackageModel.findById(id);
    if (!found) return null;
    found.isArchived = isArchived;
    const query = this.PaymentPackageModel.findByIdAndUpdate(id, found);
    if (session) {
      query.session(session);
    }
    const updated = await query;
    return PaymentPackageFactory.create(updated);
  }
}
