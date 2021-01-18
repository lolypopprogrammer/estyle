import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentPostDto {
    @IsString()
    @ApiProperty({
        example: 'description',
    })
    content: string;
}
