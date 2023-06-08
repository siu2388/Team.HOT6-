import { Router } from 'express';

const actCategoryRouter = Router();

actCategoryRouter.get('/getdata', async (req, res) => {
  res.status(200).json('data');
});

export { actCategoryRouter };
