import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassType<T> {
  new(): T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<Partial<T>, T> {
  constructor(private readonly classType: ClassType<T>) {}

  intercept(context: ExecutionContext, next: CallHandler<Partial<T>>, ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    if (req.body) {
      req.body = plainToClass(this.classType, req.body, { excludeExtraneousValues: true, strategy: 'exposeAll', ignoreDecorators: true });
    }
    return next.handle();
  }
}
