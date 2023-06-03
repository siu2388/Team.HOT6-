import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter.js';

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

app.use(userAuthRouter);

export { app };
