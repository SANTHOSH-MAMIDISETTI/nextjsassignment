import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './auth';

export const authMiddleware = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const user = verifyToken(token);
        (req as any).user = user;
        return handler(req, res);
      } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ message: 'No token provided' });
    }
  };
};
