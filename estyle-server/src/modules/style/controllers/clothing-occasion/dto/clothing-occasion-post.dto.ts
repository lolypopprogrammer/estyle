import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClothingOccasionPostDto {
  @IsString()
  @ApiProperty({
    example: 'Top',
  })
  name: string;
}
