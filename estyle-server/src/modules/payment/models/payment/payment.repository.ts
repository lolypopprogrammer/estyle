import { Model, ClientSession } from 'mongoose';
import { IPayment } from './payment.schema';
import { Payment } from './payment.model';
import { PaymentFactory } from './payment.factory';

export class PaymentRepository {

  constructor(
    private readonly PaymentModel: Model<IPayment>,
  ) {}

  startSession() {
    return this.PaymentModel.db.startSession();
  }

  async create(data: Partial<Payment>, session?: ClientSession): Promise<Payment> {
    const validation = new this.PaymentModel(data);
    const saved = await validation.save({ session });
    return PaymentFactory.create(saved);
  }

  async update(id: string, data: Partial<Payment>, session?: ClientSession): Promise<Payment> {
    const found = await this.PaymentModel.findById(id);
    if (!found) return null;
    const payment = PaymentFactory.create(found);
    payment.update(data);

    const query = this.PaymentModel.findByIdAndUpdate(id, { $set: payment.toDocument() }, { new: true });
    if (session) {
      query.session(session);
    }
    await query;
    return payment;
  }

  async updateProvided(model: Payment, session?: ClientSession): Promise<Payment> {
    const query = this.PaymentModel.findByIdAndUpdate(model.id, { $set: model.toDocument() }, { new: true });
    if (session) {
      query.session(session);
    }
    await query;
    return model;
  }

  async find(filter?: Partial<IPayment | any>): Promise<Payment[] | any> {
    const match = filter || {};
    const found = await this.PaymentModel.find(match);
    return found.map(doc => PaymentFactory.create(doc));
  }

  async findById(id: string): Promise<Payment> {
    const found = await this.PaymentModel.findById(id);
    if (!found) return null;
    return PaymentFactory.create(found);
  }
}
