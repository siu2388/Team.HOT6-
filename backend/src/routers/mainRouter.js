import { Router } from 'express';

const mainRouter = Router();

mainRouter.get('/getdata', async (req, res) => {
  res.status(200).json('data');
});

export { mainRouter };
