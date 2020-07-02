import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import _ from 'lodash';
import { User } from '../../users/entities/User.entity';

export const GetUser = createParamDecorator(
  (path: string, context: ExecutionContext): any => {
    const req = context.switchToHttp().getRequest();
    if (path) {
      return _.get(req.user, path, undefined);
    }
    return req.user as User;
  },
);
