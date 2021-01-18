import {ApiProperty} from '@nestjs/swagger';
import {IsString, IsMongoId, IsEnum, IsDateString} from 'class-validator';

export class WardrobeCalendarPostDto {

    @IsMongoId()
    @ApiProperty({
        example: '5f6266dc5b86004fe8af1b26',
    })
    outfit: string;

    @IsDateString()
    @ApiProperty({
        example: '2020-09-25T16:44:44.339Z',
    })
    date: Date;
}
