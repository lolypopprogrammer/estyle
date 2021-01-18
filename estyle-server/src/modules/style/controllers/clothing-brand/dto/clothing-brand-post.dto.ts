import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClothingBrandPostDto {
    @IsString()
    @ApiProperty({
        example: 'Top',
    })
    name: string;
}
