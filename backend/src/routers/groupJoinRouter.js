import { Router } from 'express';
import { groupJoinService } from '../services/groupJoinService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';

const groupJoinRouter = Router();

const imgupload = upload.single('image');

//유저의 그룹 가입 - userId 뭘로 할지 아직 미정
groupJoinRouter.post('/mygroups/:groupId', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const groupId = req.params.groupId;
    const state = '대기';
    console.log('req.body', req.body);
    const group = await groupJoinService.getUserGroup({ userId });

    //다른 그룹 종복 가입 방지
    if (group) {
      res.status(401).json({ message: '가입한 그룹이 존재합니다.' });
      return;
    }

    const result = await groupJoinService.groupJoin({ groupId, userId, state });

    res.json({ result, message: '등록 성공' });
    return;
  } catch (err) {
    next(err);
  }
});
//유저가 가입한 그룹 조회
groupJoinRouter.get('/mygroups/:userId', async (req, res) => {
  const result = await groupJoinService.getMyGroup();
  //console.log('내그룹조회', result);
  res.status(200).json({ result });
  return;
});

// 그룹 가입 대기자 리스트 - 관리자용 - 완
groupJoinRouter.get('/mygroups/:groupId/waiting', async (req, res) => {
  const groupId = req.params.groupId;
  console.log('groupId', groupId);

  const result = await groupJoinService.getWaitingList({ groupId });
  console.log('result', result);
  res.status(200).json({ result });
  return;
});

/// 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경 - 관리자용
groupJoinRouter.put('/mygroups/:groupId/:userId/approval', async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req.params.userId;

  const result = await groupJoinService.setJoinedGroup({ groupId , userId});
  console.log('result:', result);

  if (result) {
    res.status(200).json({ result, message: '가입승인' });
  }
  else {
    res.status(400).json({message: '대기 중인 대기자를 찾을 수 없습니다.'});
  }
  return;
});

// 유저가 가입한 그룹 탈퇴 - 완
groupJoinRouter.delete('/mygroups/:userId', async (req, res) => {
  //const userId = req.currentUserId;
  //console.log(userId);
  const result = await groupJoinService.deleteMyGroup({ userId });
  console.log('1', result);
  res.status(200).send(result);
  return;
});

export { groupJoinRouter };
