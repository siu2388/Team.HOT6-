import cors from 'cors';
import express from 'express';
import { userAuthRouter } from './routers/userRouter.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { groupRouter } from './routers/groupRouter.js';
import { activityRouter } from './routers/activityRouter.js';
import { actCategoryRouter } from './routers/actCategoryRouter.js';
import { dataRouter } from './routers/dataRouter.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello, HOT6');
});

app.use(userAuthRouter);
app.use(groupRouter);
app.use(activityRouter);
app.use(actCategoryRouter);
app.use(dataRouter);

app.use(errorMiddleware);

export { app };
