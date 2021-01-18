import { OmitType, ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from '../models/user/user.model';

export class UserPostDto extends OmitType(User, ['id', 'createdOn']) {
  @ApiProperty({
    example: 'StrongPassword123',
  })
  password: string;
}

export class UserPatchDto extends PartialType(OmitType(User, ['id', 'createdOn', 'password'])) {}
export class ProfilePatchDto extends PartialType(OmitType(User, ['id', 'createdOn', 'role', 'password', 'isArchived'])) {}
