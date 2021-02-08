import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { validationMiddleware } from '../middleware/validationSignup';
import { ReqValidationError } from '../utils/errors/reqValidationErrors';
import { BadReqError } from '../utils/errors/badReqError';
import userModel from '../models/user';
const router = express.Router();

router.post(
  '/api/users/signup',
  validationMiddleware(),
  async (req: express.Request, res: express.Response) => {
    const valiErrors = validationResult(req);
    if (!valiErrors.isEmpty()) {
      throw new ReqValidationError(valiErrors.array());
    }
    const { email, password }: { email: string; password: string } = req.body;
    const isUserAvai = await userModel.findOne({ email });
    if (isUserAvai) {
      throw new BadReqError('Email is already exist');
    }
    bcrypt.hash(password, 11, async (err, hash) => {
      if (!err) {
        const newUser = userModel.build({ email, password: hash });
        await newUser.save();
        const token: string = await jwt.sign(
          { email: newUser.email, id: newUser._id },
          process.env.JWT_TOKEN!
        );

        req.session = { token };

        res.status(201).json({
          message: 'User signed up',
          data: {
            id: newUser._id,
            email: newUser.email,
            token,
          },
        });
        return;
      }
    });
  }
);

export { router as signup };
