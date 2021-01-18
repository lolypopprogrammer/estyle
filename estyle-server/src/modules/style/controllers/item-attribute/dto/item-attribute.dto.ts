import { ApiProperty } from '@nestjs/swagger';

export class ItemAttributeDto {
  @ApiProperty({
    example: '5e70cbf1c87732ed76198dfe',
  })
  id: string;

  @ApiProperty({
    example: 'Long sleeves',
  })
  name: string;

  @ApiProperty({
    example: '5e77971ea2b7542523641b9a',
  })
  type: string;

  @ApiProperty({
    isArray: true,
    type: String,
    example: ['https://long-sleeves.com/image.png'],
  })
  pictures: string[];

  @ApiProperty({
    example: '2020-03-22T16:44:44.339Z',
  })
  createdOn: string;
}
