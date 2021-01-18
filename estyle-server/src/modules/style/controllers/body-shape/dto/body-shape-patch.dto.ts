import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BodyShapePatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Pear shape',
  })
  name: string;
}
