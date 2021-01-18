
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../modules/user/models/user/user.model';

export const CurrentUser = createParamDecorator<unknown, ExecutionContext, User>(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
