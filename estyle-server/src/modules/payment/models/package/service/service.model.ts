import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class Service {
  @ApiProperty()
  title: string;

  @ApiPropertyOptional()
  description?: string;

  constructor(
    title: string,
    description?: string,
  ) {
    this.title = title;
    this.description = description;
  }

  @Exclude()
  toJson?() {
    return {
      title: this.title,
      description: this.description,
    };
  }

  @Exclude()
  toDocument?() {
    return {
      title: this.title,
      description: this.description,
    };
  }
}
