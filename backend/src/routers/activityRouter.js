import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import moment from 'moment';

const activityRouter = Router();
const imgupload = upload.single('proofImg');

// 활동 등록
activityRouter.post('/activities', loginRequired, imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { groupId, state, name, usedDate, category, proofImg } = req.body;

    const newActivity = await activityService.addActivity({
      userId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});

// 활동 신청 승인 대기 조회
activityRouter.get('/activities/:groupId/waiting', loginRequired, async (req, res) => {
  const groupId = req.params.groupId;

  try {
    const result = await activityService.getWaitingList({ groupId });

    res.status(200).json({ result });
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 그룹 활동 조회
activityRouter.get('/activities/:groupId/:usedDate', loginRequired, async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const usedDate = req.params.usedDate;

    const date = moment(usedDate, 'YYYY-MM-DD');
    const parsedYear = date.year();
    const parsedMonth = date.month() + 1;

    const activityInfo = await activityService.getActivityInfo(groupId, parsedYear, parsedMonth);

    res.status(200).json({ activityInfo });
  } catch (error) {
    next(error);
  }
});

// 활동 신청 승인 수락
activityRouter.put('/:activityId', loginRequired, async (req, res) => {
  try {
    const activityId = req.params.activityId;

    const result = await activityService.setActivity({ activityId });

    if (result) {
      res.status(200).json({ result, message: '승인' });
    } else {
      res.status(400).json({ message: '거절' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { activityRouter };
