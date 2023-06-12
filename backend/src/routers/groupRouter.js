import { Router } from 'express';
import { groupService } from '../services/groupService.js';
import { userAuthService } from '../services/userService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupRouter = Router();

const imgupload = upload.single('thumbnail');

//그룹 생성 ( 그룹장이 되는 유저 )
groupRouter.post('/groups', loginRequired, imgupload, async (req, res, next) => {
  try {
    const { groupOwnerId, title, totalNumOfMembers, description } = req.body;
    const thumbnail = req.file ? req.file.filename : null;

    const newGroup = await groupService.addGroup({
      groupOwnerId,
      title,
      totalNumOfMembers,
      description,
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
groupRouter.get('/groups', async (req, res) => {
  const result = await groupService.getGroups();
  res.status(200).json({ result });
  return;
});

//그룹 상세 조회
groupRouter.get('/groups/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  const myGroup = await groupService.getMyGroup(groupId);
  res.status(200).json({ myGroup });
  return;
});


//그룹 삭제 -완
groupRouter.delete('/groups/:groupId/', loginRequired, async (req, res) => {
  const groupId = req.params.groupId;

  // //유저스키마에 groupId 정보 삭제
  // const updatedUser = await userAuthService.deleteGroupId({ groupId });
  // console.log('groupId업데이트 된 유저: ', updatedUser);

  const result = await groupService.deleteGroup({ groupId });
  res.status(200).send(result);
  return;
});

export { groupRouter };
