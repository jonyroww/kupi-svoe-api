import { User } from '../../src/users/entities/User.entity';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
