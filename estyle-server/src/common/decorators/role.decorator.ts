
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Role = createParamDecorator<unknown, ExecutionContext, string>(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.role;
  },
);
