import { Module, HttpModule } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { PaymentPackageService } from './services/payment-package.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentPackageSchema } from './models/package/package.schema';
import { PaymentPackageController } from './controllers/package.controller';
import { PaymentSchema } from './models/payment/payment.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'PaymentPackage', schema: PaymentPackageSchema }]),
    MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),
  ],
  providers: [PaymentService, PaymentPackageService],
  controllers: [PaymentPackageController, PaymentController],
})
export class PaymentModule {}
