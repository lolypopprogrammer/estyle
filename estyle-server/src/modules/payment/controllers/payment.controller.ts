import { Controller, Post, UseGuards, Body, HttpService, Res, BadRequestException, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { stringify } from 'qs';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt.guard';
import { MakePaymentDto } from '../dtos/payment/make-payment.dto';
import * as crypto from 'crypto';
import { PaymentPackageService } from '../services/payment-package.service';
import { PaymentService } from '../services/payment.service';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from 'src/modules/user/models/user/user.model';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(
    private readonly service: PaymentService,
    private readonly packageService: PaymentPackageService,
    private readonly http: HttpService,
  ) {}

  @Post()
  async makePayment(
    @CurrentUser() user: User,
    @Body() data: MakePaymentDto,
  ) {
    const paymentPackage = await this.packageService.findById(data.packageId);
    const response = await this.service.initPaymentGateway(user, paymentPackage, data.sku);
    return response;
  }

  @Get(':id')
  async getPaymentById(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.findById(id, user);
  }

  @Get(':id/status')
  async getPaymentStatusById(
    @Param('id') id: string,
    @CurrentUser() user: User,
  ) {
    return this.service.getStatus(id, user);
  }
}
