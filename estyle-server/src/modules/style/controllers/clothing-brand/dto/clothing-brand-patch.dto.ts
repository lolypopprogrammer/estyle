import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ClothingBrandPatchDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'Top',
    })
    name: string;
}
