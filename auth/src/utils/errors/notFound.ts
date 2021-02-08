import CustomError from '../interface/customError';

export class NotFound extends Error implements CustomError {
  constructor() {
    super();
    Object.setPrototypeOf(this, NotFound.prototype);
  }
  customErrors() {
    return [
      {
        message: 'Not found',
      },
    ];
  }
}
