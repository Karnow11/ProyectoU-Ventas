
import { Request, Response, NextFunction } from 'express';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(501).json({ error: 'Authentication not implemented' });
  } catch (error: any) {
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    res.status(501).json({ error: 'Authorization not implemented' });
  };
};
