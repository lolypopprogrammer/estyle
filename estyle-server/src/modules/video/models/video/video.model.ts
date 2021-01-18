import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Types } from 'mongoose';
import { VideoPrivacy } from './video-privacy.enum';

export class Video {
  @ApiProperty({
    type: String,
  })
  id: Types.ObjectId;

  @IsUrl()
  @ApiProperty()
  url: string;

  @IsOptional()
  @IsUrl()
  @ApiPropertyOptional()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  description?: string;

  @IsOptional()
  @IsEnum(VideoPrivacy)
  @ApiPropertyOptional()
  privacy: VideoPrivacy;

  @IsOptional()
  @ApiPropertyOptional()
  transcript?: string;

  @ApiProperty()
  createdOn: string;

  @ApiProperty()
  updatedOn: string;

  @ApiProperty()
  isPrimary: boolean;

  @Exclude()
  isArchived: boolean;

  constructor(
    url: string,
    thumbnail: string,
    title: string,
    privacy: VideoPrivacy,
    createdOn: string,
    updatedOn: string,
    isArchived: boolean,
    isPrimary: boolean,
    description?: string,
    transcript?: string,
    id?: Types.ObjectId,
  ) {
    this.url = url;
    this.thumbnail = thumbnail;
    this.title = title;
    this.privacy = privacy;
    this.createdOn = createdOn;
    this.updatedOn = updatedOn;
    this.isArchived = isArchived;
    this.isPrimary = isPrimary;
    this.description = description;
    this.transcript = transcript;
    this.id = id;
  }

  @Exclude()
  update(data: Partial<Video>): void {
    Object.keys(data)
      .filter(key => data[key] !== undefined)
      .forEach((key) => {
        this[key] = data[key];
      });
  }

  @Exclude()
  toJson() {
    return {
      id: this.id,
      url: this.url,
      thumbnail: this.thumbnail,
      title: this.title,
      privacy: this.privacy,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
      description: this.description,
      transcript: this.transcript,
      isPrimary: this.isPrimary,
    };
  }

  @Exclude()
  toDocument() {
    return {
      url: this.url,
      thumbnail: this.thumbnail,
      title: this.title,
      privacy: this.privacy,
      createdOn: this.createdOn,
      updatedOn: this.updatedOn,
      isArchived: this.isArchived,
      isPrimary: this.isPrimary,
      description: this.description,
      transcript: this.transcript,
    };
  }
}
