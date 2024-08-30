import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface TokenPayload {
  id: string;
  role: 'admin' | 'team member';
}

export const generateToken = (user: { _id: string; role: 'admin' | 'team member' }) => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  return jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token: string): TokenPayload => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid token');
  }
};
