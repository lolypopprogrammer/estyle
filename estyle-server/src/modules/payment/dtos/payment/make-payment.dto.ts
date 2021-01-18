import { IsMongoId, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class MakePaymentDto {
  @IsMongoId()
  @ApiProperty()
  packageId: string;

  @IsString()
  @ApiProperty()
  sku: string;
}