import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ItemAttributeTypePatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Sleeves',
  })
  name: string;
}
