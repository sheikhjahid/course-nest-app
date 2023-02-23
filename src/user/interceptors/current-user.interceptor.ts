import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class currentUserInterceptor implements NestInterceptor {
  constructor(private service: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = await context.switchToHttp().getRequest();

    const { userId } = request.session;
    if (userId) {
      const user = await this.service.findOne(userId);
      request.user = user;
    }

    return next.handle();
  }
}
