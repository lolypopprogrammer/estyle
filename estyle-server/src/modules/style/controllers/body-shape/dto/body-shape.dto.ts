import { ApiProperty } from '@nestjs/swagger';

export class BodyShapeDto {
  @ApiProperty({
    example: '5e70cbf1c87732ed76198dfe',
  })
  id: string;

  @ApiProperty({
    example: 'Pear shape',
  })
  name: string;

  @ApiProperty({
    example: '2020-03-22T16:44:44.339Z',
  })
  createdOn: string;
}
