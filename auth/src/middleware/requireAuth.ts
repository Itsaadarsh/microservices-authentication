import express from 'express';
import { BadReqError } from '../utils/errors/badReqError';

export const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.currentUser) {
    throw new BadReqError('Not Authorized');
  }
  next();
};
