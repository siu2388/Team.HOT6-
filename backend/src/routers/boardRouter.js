import { Router } from 'express';
import { activityService } from '../services/activityService.js';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import moment from 'moment';
import { boardService } from '../services/boardService.js';

const boardRouter = Router();
const imgupload = upload.single('boardImage');

// 커뮤니티 등록
boardRouter.post('/', loginRequired, imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { title, description } = req.body;

    const newBoard = await boardService.addBoard({
      userId,
      title,
      description,
      boardImage: req.file ? req.file.filename : null,
    });

    res.status(201).json(newBoard);
  } catch (error) {
    next(error);
  }
});

boardRouter.put('/:boardId', loginRequired, imgupload, async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title, description } = req.body;

    const toUpdate = {
      title,
      description,
      boardImage: req.file ? req.file.filename : null,
    };
    const updatedBoard = await boardService.setBoard({ boardId, toUpdate });

    res.status(201).json(updatedBoard);
  } catch (error) {
    next(error);
  }
});

boardRouter.get('/:boardId', async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const board = await boardService.getBoard({ boardId });

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
});

boardRouter.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = 10;

    const { boards, count } = await boardService.getBoards(page, limit);

    const totalPages = Math.ceil(count / limit);
    const currentPage = Math.min(page, totalPages);
    res.status(200).json({
      currentPage,
      totalPages,
      boards,
    });
    return;
  } catch (error) {
    next(error);
  }
});

boardRouter.delete('/:boardId', loginRequired, async (req, res, next) => {
  try {
    const { boardId } = req.params;

    await boardService.deleteBoard({ boardId });

    res.status(200).json({ message: '커뮤니티 삭제 성공' });
    return;
  } catch (error) {
    next(error);
  }
});
// 좋아요
boardRouter.post('/:boardId/like', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { boardId } = req.params;
    const updatedBoard = await boardService.likeBoard({ boardId, userId });
    res.status(200).json(updatedBoard);
  } catch (error) {
    next(error);
  }
});
// 싫어요
boardRouter.post('/:boardId/unLike', loginRequired, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { boardId } = req.params;
    const updatedBoard = await boardService.unLikeBoard({ boardId, userId });
    res.status(200).json(updatedBoard);
  } catch (error) {
    next(error);
  }
});

export { boardRouter };
