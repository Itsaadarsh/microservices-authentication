import { ValidationError } from 'express-validator';
import CustomError from '../interface/customError';

export class ReqValidationError extends Error implements CustomError {
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ReqValidationError.prototype);
  }

  customErrors() {
    return this.errors.map(err => {
      return {
        message: err.msg,
        field: err.param,
      };
    });
  }
}
