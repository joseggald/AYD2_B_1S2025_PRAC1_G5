import { Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../utils/responses';
import { verifyToken } from '../utils/jwt';

const { sendError } = ResponseHandler;

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      sendError(res, 'No token provided', 401);
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      sendError(res, 'Invalid or expired token', 401);
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 'Authentication failed', 401);
  }
};