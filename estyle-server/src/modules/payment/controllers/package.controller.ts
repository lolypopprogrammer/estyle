import { Controller, Get, Query, Post, Body, Param, Patch, UseInterceptors, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { PackagePaymentType } from '../models/package/package-payment-type.enum';
import { PaymentPackageService } from '../services/payment-package.service';
import { ReturnType } from '../../../common/dto/return-type.enum';
import { IPaymentPackage } from '../models/package/package.schema';
import { PaymentPackageDto } from '../dtos/package/package.dto';
import { PaymentPackagePostDto } from '../dtos/package/package-post.dto';
import { PaymentPackagePatchDto } from '../dtos/package/package-patch.dto';
import { TransformInterceptor } from 'src/common/interceptor/transform.interceptor';
import { PaymentPackageVariationDto } from '../dtos/package/package-variation.dto';
import { PaymentPackageVariationPatchDto } from '../dtos/package/package-variation-patch.dto';
import { JwtAuthGuard } from '../../../modules/auth/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Payment package')
@Controller('payment/package')
export class PaymentPackageController {
  constructor(
    private readonly service: PaymentPackageService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: PaymentPackageDto,
  })
  async create(@Body() data: PaymentPackagePostDto): Promise<PaymentPackageDto> {
    return this.service.create(data);
  }

  @Get('')
  @ApiQuery({
    required: false,
    name: 'type',
    enum: PackagePaymentType,
    type: String,
  })
  @ApiQuery({
    required: false,
    name: 'returnType',
    enum: ReturnType,
    type: String,
  })
  @ApiOkResponse({
    type: PaymentPackageDto,
    isArray: true,
  })
  async getAll(
    @Query('type') type?: PackagePaymentType,
    @Query('returnType') returnType: ReturnType = ReturnType.ACTIVE,
  ): Promise<PaymentPackageDto[]> {
    const filter: Partial<IPaymentPackage> = {};
    if (type) {
      filter.paymentType = type;
    }
    return this.service.find(filter, returnType);
  }

  @ApiOkResponse({
    type: PaymentPackageDto,
  })
  @Get(':id')
  async getById(@Param('id') id: string): Promise<PaymentPackageDto> {
    return this.service.findById(id);
  }

  @ApiOkResponse({
    type: PaymentPackageDto,
  })
  @UseInterceptors(new TransformInterceptor(PaymentPackagePatchDto))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: PaymentPackagePatchDto,
  ) {
    return this.service.update(id, data);
  }

  @ApiOkResponse()
  @Delete(':id')
  async archive(@Param('id') id: string) {
    return this.service.setArchived(id, true);
  }

  @ApiOkResponse()
  @Post(':id/unarchive')
  async unarchive(@Param('id') id: string) {
    return this.service.setArchived(id, false);
  }

  @ApiOkResponse({
    type: PaymentPackageDto,
  })
  @Post(':id/variation')
  async addVariation(
    @Param('id') id: string,
    @Body() data: PaymentPackageVariationDto,
  ) {
    return this.service.addVariation(id, data);
  }

  @ApiOkResponse({
    type: PaymentPackageDto,
  })
  @Patch(':id/variation/:variationId')
  async updateVariation(
    @Param('id') id: string,
    @Param('variationId') variationId: string,
    @Body() data: PaymentPackageVariationPatchDto,
  ) {
    return this.service.updateVariation(id, variationId, data);
  }

  @Delete(':id/variation/:variationId')
  async archiveVariation(
    @Param('id') id: string,
    @Param('variationId') variationId: string,
  ) {
    return this.service.setArchivedForVariation(id, variationId, true);
  }

  @Post(':id/variation/:variationId/unarchive')
  async unarchiveVariation(
    @Param('id') id: string,
    @Param('variationId') variationId: string,
  ) {
    return this.service.setArchivedForVariation(id, variationId, false);
  }
}
