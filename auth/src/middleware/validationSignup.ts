import { body } from 'express-validator';

export const validationMiddleware = () => {
  return [
    body('email').isEmail().withMessage('Something went wrong with EMAIL'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('Password must be b/w 5 - 20 characters'),
  ];
};
