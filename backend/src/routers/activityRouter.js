import { Router } from 'express';

const activityRouter = Router();

activityRouter.get('/getdata', async (req, res) => {
  res.status(200).json('data');
});

export { activityRouter };
