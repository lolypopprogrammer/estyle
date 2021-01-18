import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PersonalStylePatchDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Classic',
  })
  name: string;
}
