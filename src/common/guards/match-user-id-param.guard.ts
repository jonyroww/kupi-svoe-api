import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class MatchUserIdParamGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user;

    const userId: string | void = request.params.userId;

    if (userId && userId === user.id.toString()) {
      return true;
    }

    return false;
  }
}
