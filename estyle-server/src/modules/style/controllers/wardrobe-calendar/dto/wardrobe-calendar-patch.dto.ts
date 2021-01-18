import {ApiProperty} from '@nestjs/swagger';
import {IsMongoId, IsDateString, IsOptional} from 'class-validator';

export class WardrobeCalendarPatchDto {

    @IsOptional()
    @IsMongoId()
    @ApiProperty({
        example: '5f6266dc5b86004fe8af1b26',
    })
    outfit: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty({
        example: '2020-09-25T16:44:44.339Z',
    })
    date: Date;
}
