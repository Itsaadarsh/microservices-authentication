import express from 'express';
import { currentUser } from '../middleware/currentUser';
import { authMiddleware } from '../middleware/requireAuth';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  authMiddleware,
  async (req: express.Request, res: express.Response) => {
    res.status(200).json({ currentUser: req.currentUser });
  }
);

export { router as currentUser };
