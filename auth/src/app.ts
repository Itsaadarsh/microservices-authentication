import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { currentUser } from './routes/currentUser';
import { signin } from './routes/signin';
import { signup } from './routes/signup';
import { signout } from './routes/signout';
import { errorHandler } from './middleware/errorHandling';
import { NotFound } from './utils/errors/notFound';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));

app.use(currentUser);
app.use(signup);
app.use(signin);
app.use(signout);
app.all('*', async (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
