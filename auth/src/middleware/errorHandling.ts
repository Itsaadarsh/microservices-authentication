import express from 'express';
import { BadReqError } from '../utils/errors/badReqError';
import { DBConnectionError } from '../utils/errors/dbConnectionError';
import { NotFound } from '../utils/errors/notFound';
import { ReqValidationError } from '../utils/errors/reqValidationErrors';

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof ReqValidationError) {
    return res.status(400).send({ errors: err.customErrors() });
  }

  if (err instanceof DBConnectionError) {
    return res.status(400).send({ errors: err.customErrors() });
  }

  if (err instanceof NotFound) {
    return res.status(400).send({ errors: err.customErrors() });
  }

  if (err instanceof BadReqError) {
    return res.status(400).send({ errors: err.customErrors() });
  }

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
