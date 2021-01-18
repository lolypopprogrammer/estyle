import { ApiProperty } from '@nestjs/swagger';

export class PictureDto {
    @ApiProperty({
        type: 'string',
        format: 'binary',
    })
    picture: any;
}
