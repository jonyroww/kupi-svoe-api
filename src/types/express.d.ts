// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User as _User } from '../../src/users/entities/User.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends _User {}

    interface Request {
      user?: User;
    }
  }
}
