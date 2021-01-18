import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Exclude } from 'class-transformer';
import { randomBytes } from 'crypto';

export class Forgot {
  @ApiProperty({
    type: String,
  })
  user: Types.ObjectId;

  @ApiProperty()
  token: string;

  @Exclude()
  createdOn: string;

  @Exclude()
  id: Types.ObjectId;

  constructor(
    user: Types.ObjectId,
    token: string,
    createdOn: string,
    id?: Types.ObjectId,
  ) {
    this.user = user;
    this.token = token;
    this.createdOn = createdOn;
    this.id = id;
  }

  @Exclude()
  toJson() {
    return {
      user: this.user,
      token: this.token,
    };
  }

  @Exclude()
  toDocument() {
    return {
      user: this.user,
      token: this.token,
      createdOn: this.createdOn,
    };
  }

  @Exclude()
  generateToken() {
    const buffer = randomBytes(32);
    this.token = buffer.toString('hex');
  }
}
