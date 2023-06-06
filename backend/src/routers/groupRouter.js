import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('image');

/** 유저의 그룹 생성 추가 ( 그룹장이 되는 유저 ) */
groupRouter.post('/group/create', loginRequired, imgupload, async (req, res, next) => {
  try {
    const groupOwner = req.currentUserId;
    const { title, memberCount, description } = req.body;
    const thumbnail = req.file;

    const newGroup = await groupService.addGroup({
      groupOwner,
      title,
      memberCount,
      description,
      //thumbnail,  thumbnail도 이렇게 저장하는게 맞나?
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

groupRouter.get('/group', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

export { groupRouter };
