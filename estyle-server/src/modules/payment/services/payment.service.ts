import { Injectable, HttpService, BadRequestException, NotFoundException } from '@nestjs/common';
import { PaymentPackage } from '../models/package/package.model';
import { User } from '../../../modules/user/models/user/user.model';
import { stringify } from 'qs';
import { PaymentPackageDto } from '../dtos/package/package.dto';
import { PackagePaymentType } from '../models/package/package-payment-type.enum';
import * as moment from 'moment';
import { PaymentRepository } from '../models/payment/payment.repository';
import { InjectModel } from '@nestjs/mongoose';
import { IPayment } from '../models/payment/payment.schema';
import { Model, ClientSession } from 'mongoose';
import { PaymentStatus } from '../dtos/payment/payment-status.enum';
import { Payment } from '../models/payment/payment.model';
import { UserRole } from 'src/modules/user/dto/role.enum';

@Injectable()
export class PaymentService {
  private readonly repository: PaymentRepository;

  constructor(
    private readonly http: HttpService,
    @InjectModel('Payment') PaymentModel: Model<IPayment>,
  ) {
    this.repository = new PaymentRepository(PaymentModel);
  }

  async initPaymentGateway(user: User, paymentPackage: PaymentPackageDto, sku: string) {
    const variation = paymentPackage.variations.find((vari => vari.sku === sku));
    if (!variation) {
      throw new BadRequestException('Invalid SKU');
    }
    const request: any = {
      ivp_method: 'create',
      ivp_store: process.env.TELR_STORE_ID,
      ivp_authkey: process.env.TELR_AUTH_KEY,
      ivp_currency: process.env.TELR_CURRENCY,
      ivp_test: process.env.NODE_ENV !== 'production',
      ivp_desc: `${paymentPackage.name} / ${variation.name}`,
      return_auth: process.env.APP_URL + '/payment/success',
      return_decl: process.env.APP_URL + '/payment/declined',
      return_can: process.env.APP_URL + '/payment/canceled',
      bill_fname: user.firstName,
      bill_sname: user.lastName,
      bill_email: user.email,
      ivp_amount: variation.price,
    };
    if (paymentPackage.paymentType === PackagePaymentType.RECURRING) {
      request.repeat_amount = variation.price;
      request.repeat_period = 'M';
      request.repeat_interval = 1;
      request.repeat_start = moment().add(1, 'month').format('DDMMYYYY');
      request.repeat_final = 0;
      request.repeat_term = 0;
    }
    let session: ClientSession;
    let payment: Payment;
    let response;
    try {
      session = await this.repository.startSession();
      session.startTransaction();
      payment = await this.repository.create({
        user: user.id,
        paymentPackage: paymentPackage.id,
        sku,
        status: PaymentStatus.PENDING,
      }, session);
      request.ivp_cart = payment.id.toString();
      request.return_auth = `${request.return_auth}/${payment.id}`,
      response = await this.http.post(
        'https://secure.telr.com/gateway/order.json',
        stringify(request),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ).toPromise();
      payment.orderRef = response.data.order?.ref;
      payment.error = response.data.error?.message;
      await this.repository.updateProvided(payment, session);
      await session.commitTransaction();
      return response.data;
    } catch (err) {
      if (payment && response.data.order) {
        return response.data;
      }
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  }

  async findById(id: string, user: User) {
    const payment = await this.repository.findById(id);
    if (!payment.user.equals(user.id) && user.role !== UserRole.ADMIN) {
      throw new NotFoundException('Payment now found');
    }
    return payment.toJson();
  }

  async getStatus(id: string, user: User) {
    const payment = await this.repository.findById(id);
    if (!payment.user.equals(user.id) && user.role !== UserRole.ADMIN) {
      throw new NotFoundException('Payment now found');
    }
    const request = {
      ivp_method: 'check',
      ivp_store: process.env.TELR_STORE_ID,
      ivp_authkey: process.env.TELR_AUTH_KEY,
      order_ref: payment.orderRef,
    };
    const res = await this.http.post(
      'https://secure.telr.com/gateway/order.json',
      stringify(request),
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    ).toPromise();
    if (res.data.order?.status?.code !== undefined && res.data.order?.status?.code !== payment.status) {
      payment.status = res.data.order?.status?.code;
      await this.repository.updateProvided(payment);
    }
    return res.data.order?.status?.code;
  }
}
