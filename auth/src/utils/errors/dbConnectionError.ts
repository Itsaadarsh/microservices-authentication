import CustomError from '../interface/customError';

export class DBConnectionError extends Error implements CustomError {
  reason = 'Error connecting to the DB';
  constructor() {
    super();
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }
  customErrors() {
    return [{ message: this.reason }];
  }
}
