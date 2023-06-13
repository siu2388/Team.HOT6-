import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { userAuthService } from '../services/userService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import moment from 'moment';

const date = moment().format('YYYY.MM.DD');
const groupRouter = Router();

const imgupload = upload.single('thumbnail');

//그룹 생성 ( 그룹장이 되는 유저 )
groupRouter.post('/groups', loginRequired, imgupload, async (req, res, next) => {
  try {
    const groupOwnerId = req.currentUserId;
    const { title, totalNumOfMembers, createdAt, description } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    //그룹 중복 생성 방지
    const isGroupexisted = await groupService.getGroupByOwnerId(groupOwnerId);
    // if (isGroupexisted) {
    //   res.status(401).json({ message: '생성한 그룹이 존재합니다.' });
    //   return;
    // }

    const newGroup = await groupService.addGroup({
      groupOwnerId,
      title,
      totalNumOfMembers,
      description,
      createdAt: date,
      thumbnail,
    });

    //그룹장에게 groupId 정보 업뎃
    const createdGroup = await newGroup.save();
    const userId = groupOwnerId;
    const groupId = createdGroup._id;
    const updatedUser = await userAuthService.setUserGroup({ userId, groupId });

    if (newGroup.errorMessage) {
      throw new Error(newGroup.errorMessage);
    }
    res.status(201).json({ newGroup, updatedUser });
    return;
  } catch (error) {
    next(error);
  }
});

//그룹 목록 조회
groupRouter.get('/groups', async (req, res, next) => {
  console.log(req.query);
  try {
    const page = parseInt(req.query.page || 1);
    const limit = 9;
    const skip = (page - 1) * limit;
    console.log('page : ', page);
    console.log('skip : ', skip);

    const { groups, count } = await groupService.getGroups(skip, limit);
    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      groups,
    });
    return;
  } catch (error) {
    next(error);
  }
});

//그룹 상세 조회
groupRouter.get('/groups/:groupId', async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const myGroup = await groupService.getMyGroup(groupId);
    const members = await userAuthService.getMembers({ groupId });
    res.status(200).json({ myGroup, members });
    return;
  } catch (error) {
    next(error);
  }
});

// 그룹명 검색
groupRouter.get('/searchgroups', async (req, res, next) => {
  try {
    const { title } = req.query;
    const result = await groupService.searchGroup({ title });
    res.status(200).json({ result });
    return;
  } catch (error) {
    next(error);
  }
});

//그룹 삭제
groupRouter.delete('/groups/:groupId/', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const groupId = req.params.groupId;

    //그룹장의 groupId도 삭제
    const updatedUser = await userAuthService.deleteGroupId({ groupId, userId });

    const result = await groupService.deleteGroup({ groupId });
    res.status(200).send({ result, updatedUser });
    return;
  } catch (error) {
    next(error);
  }
});

export { groupRouter };
