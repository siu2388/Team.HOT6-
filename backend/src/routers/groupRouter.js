import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('thumbnail');

/** 유저의 그룹 생성 추가 ( 그룹장이 되는 유저 ) */
groupRouter.post('/groups', loginRequired, imgupload, async (req, res, next) => {
  try {
    const groupOwner = req.currentUserId;
    const { title, totalNumOfMembers, description } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    const newGroup = await groupService.addGroup({
      groupOwner,
      title,
      totalNumOfMembers,
      description,
      thumbnail,
    });

    if (newGroup.errorMessage) {
      throw new Error(newGroup.errorMessage);
    }
    res.status(201).json({ newGroup });
    return;
  } catch (error) {
    next(error);
  }
});

groupRouter.get('/groups', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

export { groupRouter };
