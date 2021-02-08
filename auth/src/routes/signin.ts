import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/user';
import { validationMiddleware } from '../middleware/validationSignup';
import { validationResult } from 'express-validator';
import { ReqValidationError } from '../utils/errors/reqValidationErrors';
import { BadReqError } from '../utils/errors/badReqError';

const router = express.Router();

router.post(
  '/api/users/signin',
  validationMiddleware(),
  async (req: express.Request, res: express.Response) => {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      throw new ReqValidationError(valiErrors.array());
    }
    const { email, password }: { email: string; password: string } = req.body;
    const isUserEmailAvai = await userModel.findOne({ email });
    if (isUserEmailAvai === null) {
      throw new BadReqError('User not found');
    }
    bcrypt.compare(password, isUserEmailAvai.password, async (err, hash) => {
      if (err || hash === false) {
        return res.status(400).json({
          errors: [
            {
              message: 'Incorrect Password',
            },
          ],
        });
      }
      const token: string = await jwt.sign(
        { email: isUserEmailAvai.email, id: isUserEmailAvai._id },
        process.env.JWT_TOKEN!
      );

      req.session = { token };
      res.status(201).json({
        message: 'User signed in',
        data: {
          id: isUserEmailAvai._id,
          email: isUserEmailAvai.email,
          token,
        },
      });
    });
  }
);

export { router as signin };
