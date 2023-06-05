import is from '@sindresorhus/is';
import { Router } from 'express';
import { loginRequired } from '../middlewares/loginRequired.js';
import { userAuthService } from '../services/userService.js';

const userAuthRouter = Router();

userAuthRouter.post('/user/register', async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error('headers의 Content-Type을 application/json으로 설정해주세요');
    }

    const { inputId, password, name, nickname, phone, address, profileImage } = req.body;

    const newUser = await userAuthService.addUser({
      inputId,
      password,
      name,
      nickname,
      phone,
      address,
      profileImage,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post('/user/login', async function (req, res, next) {
  try {
    const inputId = req.body.inputId;
    const password = req.body.password;

    const user = await userAuthService.getUser({ inputId, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get('/userlist', loginRequired, async function (req, res, next) {
  try {
    const users = await userAuthService.getUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get('/user/current', loginRequired, async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const currentUserInfo = await userAuthService.getUserInfo({
      user_id,
    });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put('/users/:id', loginRequired, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const inputId = req.body.inputId ?? null;
    const password = req.body.password ?? null;
    const name = req.body.name ?? null;
    const nickname = req.body.nickname ?? null;
    const phone = req.body.phone ?? null;
    const address = req.body.address ?? null;
    const profileImage = req.body.profileImage ?? null;

    const toUpdate = { inputId, password, name, nickname, phone, address, profileImage };

    const updatedUser = await userAuthService.setUser({ userId, toUpdate });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get('/users/:id', loginRequired, async function (req, res, next) {
  try {
    const userId = req.params.id;
    const currentUserInfo = await userAuthService.getUserInfo({ userId });

    if (currentUserInfo.errorMessage) {
      throw new Error(currentUserInfo.errorMessage);
    }

    res.status(200).send(currentUserInfo);
  } catch (error) {
    next(error);
  }
});

// // jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
// userAuthRouter.get('/afterlogin', loginRequired, function (req, res, next) {
//   res.status(200).send(`안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`);
// });

export { userAuthRouter };
