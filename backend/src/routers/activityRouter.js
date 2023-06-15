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
    const { groupId, name, usedDate, category } = req.body;

    const newActivity = await activityService.addActivity({
      userId,
      groupId,
      name,
      usedDate,
      category,
      proofImg: req.file.filename,
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

// 그룹 활동 월별 총합
activityRouter.get('/activities/:groupId/:usedDate/totalCount', async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const usedDate = req.params.usedDate;

    const date = moment(usedDate, 'YYYY-MM-DD');
    const parsedYear = date.year();
    const parsedMonth = date.month() + 1;

    const activityInfo = await activityService.getActivityCount(groupId, parsedYear, parsedMonth);

    res.status(200).json(activityInfo);
  } catch (error) {
    next(error);
  }
});

// 그룹 활동 조회(달력 표시)
activityRouter.get('/activities/:groupId/:usedDate', async (req, res, next) => {
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

// 활동 신청 승인 거절
activityRouter.delete('/:activityId', loginRequired, async (req, res, next) => {
  try {
    const activityId = req.params.activityId;

    const result = await activityService.deleteActivity({ activityId });

    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

// 유저 활동 목록 조회
activityRouter.get('/activities', loginRequired, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = 6;
    const skip = (page - 1) * limit;

    const userId = req.currentUserId;
    const { activities, count } = await activityService.getActivities(userId, skip, limit);

    res.status(200).json({ currentPage: page, totalPages: Math.ceil(count / limit), activities });
  } catch (error) {
    next(error);
  }
});

// 그룹 활동 랭킹
activityRouter.get('/activities/totalCount', async (req, res, next) => {
  try {
    const totalCounts = await activityService.getTotalCounts();
    res.status(200).json({ totalCounts });
  } catch (error) {
    next(error);
  }
});

export { activityRouter };
