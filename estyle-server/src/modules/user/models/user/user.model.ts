import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { compare, hash } from 'bcrypt';
import { Types } from 'mongoose';
import { UserRole } from '../../dto/role.enum';

export class User {
  @ApiProperty({
    type: String,
    example: '5ea572a2724cdb0f525a4ce7',
  })
  id?: Types.ObjectId;

  @IsEmail()
  @ApiProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  email: string;

  @Exclude()
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({
    type: String,
    enum: UserRole,
  })
  role: UserRole;

  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  thumbnailBrandData?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  backgroundBrandData?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  firstSliderPicture?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  secondSliderPicture?: string[];

  @IsOptional()
  @ApiPropertyOptional({
    isArray: true,
    type: String,
    example: ['https://tops.com/image.png'],
  })
  thirdSliderPicture?: string[];

  @IsString()
  @ApiProperty({
    type: String,
    example: 'John',
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    example: 'Von',
  })
  middleName?: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    example: '2020-04-26T12:40:45.291Z',
  })
  createdOn: string;

  @Exclude()
  isArchived: boolean;

  @ApiProperty({
    type: String,
    example: `Don't worry be happy`,
  })
  status: string;

  @ApiProperty({
    type: String,
    example: `User`,
  })
  type: string;

  constructor(
    email: string,
    password: string,
    role: UserRole,
    firstName: string,
    lastName: string,
    middleName?: string,
    createdOn?: string,
    isArchived?: boolean,
    id?: Types.ObjectId,
    status?: string,
    type?: string,
    backgroundBrandData?: string[],
    thumbnailBrandData?: string[],
    firstSliderPicture?: string[],
    secondSliderPicture?: string[],
    thirdSliderPicture?: string[],
  ) {
    this.email = email;
    this.password = password;
    this.thumbnailBrandData = thumbnailBrandData;
    this.backgroundBrandData = backgroundBrandData;
    this.firstSliderPicture = firstSliderPicture;
    this.secondSliderPicture = secondSliderPicture;
    this.thirdSliderPicture = thirdSliderPicture;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.createdOn = createdOn;
    this.isArchived = isArchived;
    this.id = id;
    this.status = status;
    this.type = type;
  }

  @Exclude()
  async setPassword(password: string) {
    this.password = await hash(password, 10);
  }

  @Exclude()
  async isMatchingPassword(password: string) {
    return compare(password, this.password);
  }

  @Exclude()
  toJson() {
    const origin = `${process.env.ORIGIN}:${process.env.PORT}`;

    return {
      thumbnailBrandData: `${origin}/${this.thumbnailBrandData}`,
      backgroundBrandData: `${origin}/${this.backgroundBrandData}`,
      firstSliderPicture: `${origin}/${this.firstSliderPicture}`,
      secondSliderPicture: `${origin}/${this.secondSliderPicture}`,
      thirdSliderPicture: `${origin}/${this.thirdSliderPicture}`,
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      createdOn: this.createdOn,
      status: this.status,
      type: this.type,
    };
  }

  @Exclude()
  toObject() {
    return {
      id: this.id?.toString(),
      thumbnailBrandData: this.thumbnailBrandData,
      backgroundBrandData: this.backgroundBrandData,
      firstSliderPicture: this.firstSliderPicture,
      secondSliderPicture: this.secondSliderPicture,
      thirdSliderPicture: this.thirdSliderPicture,
      email: this.email,
      password: this.password,
      role: this.role,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      isArchived: this.isArchived,
      status: this.status,
      type: this.type,
    };
  }
}
