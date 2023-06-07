import { Router } from 'express';
import { groupJoinService } from '../services/groupJoinService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupJoinRouter = Router();

const imgupload = upload.single('image');

/** 유저의 그룹 생성 추가 ( 그룹장이 되는 유저 ) */
groupJoinRouter.post('/groups/:', loginRequired, imgupload, async (req, res, next) => {
  try {
    const groupOwner = req.currentUserId;
    const { title, memberCount, description } = req.body;
    const thumbnail = req.files;

    const newGroup = await groupService.addGroup({
      groupOwner,
      title,
      memberCount,
      description,
      //thumbnail,  thumbnail도 이렇게 저장하는게 맞나?
    });

    if (newGroupJoin.errorMessage) {
      throw new Error(newGroupJoin.errorMessage);
    }
    res.status(201).json({ newGroupJoin });
    return;
  } catch (error) {
    next(error);
  }
});

groupJoinRouter.get('/group', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

export { groupJoinRouter };
