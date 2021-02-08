import express from 'express';
import jwt from 'jsonwebtoken';

interface USERPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: USERPayload;
    }
  }
}

export const currentUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!req.session?.token) {
    return next();
  }
  try {
    const isVerified = jwt.verify(req.session?.token, process.env.JWT_TOKEN!) as USERPayload;
    req.currentUser = isVerified;
  } catch (err) {}
  next();
};
