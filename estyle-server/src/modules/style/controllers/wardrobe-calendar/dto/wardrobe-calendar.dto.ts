import { ApiProperty } from '@nestjs/swagger';
import {IsDateString} from 'class-validator';

export class WardrobeCalendarDto {
    @ApiProperty({
        example: '5e70cbf1c87732ed76198dfe',
    })
    id: string;

    @ApiProperty({
        example: '2e10cbf1v87f32ed76193f2e',
    })
    outfit: string;

    @IsDateString()
    @ApiProperty({
        example: '2020-09-25T16:44:44.339Z',
    })
    date: Date;
}
