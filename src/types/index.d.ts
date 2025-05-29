import 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      role: string | number;
      // other props
    }

    interface Request {
      user?: User;
    }
  }
}
