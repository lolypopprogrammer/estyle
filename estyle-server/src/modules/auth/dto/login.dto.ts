import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/models/user/user.model';

export class LoginDto {
  @ApiProperty()
  token: string;

  @ApiProperty({
    type: User,
  })
  user: User;
}
