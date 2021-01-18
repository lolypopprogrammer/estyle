import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiresAdmin = this.reflector.get<boolean>('admin', context.getHandler());
    const requiresServer = this.reflector.get<boolean>('server', context.getHandler());
    if (!requiresAdmin && !requiresServer) return true;

    const request = context.switchToHttp().getRequest();
    return request.role === 'admin';
  }
}
