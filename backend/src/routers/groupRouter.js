import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('thumbnail');

groupRouter.post('/groups/:groupId/join', loginRequired, async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.currentUserId;
    const state = '대기';

    const group = await groupService.getUserGroup({ userId });

    if (group) {
      res.status(401).json({ message: '가입한 그룹이 존재합니다.' });
      return;
    }

    const result = await groupService.groupJoin({ groupId, userId, state });

    res.json({ result, message: '등록 성공' });
    return;
  } catch (err) {
    next(err);
  }
});

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

groupRouter.get('/groups', async (req, res, next) => {
  try {
    const result = await groupService.getGroups();

    res.status(200).json({ result });
    return;
  } catch (err) {
    next(err);
  }
});

export { groupRouter };
