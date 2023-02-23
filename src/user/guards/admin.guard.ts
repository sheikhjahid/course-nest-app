import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    if (user?.admin === false) {
      throw new ForbiddenException(
        'Only admin user is allowed for this route access',
      );
    }

    return true;
  }
}
