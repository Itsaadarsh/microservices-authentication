import CustomError from '../interface/customError';

export class BadReqError extends Error implements CustomError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadReqError.prototype);
  }

  customErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
