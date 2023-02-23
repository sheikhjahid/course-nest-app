import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import { User } from '../user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private service: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const userId = req.session.userId;
    if (userId) {
      const user = await this.service.findOne(userId);
      req.user = user;
    }
    next();
  }
}
