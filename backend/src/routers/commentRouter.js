import { Router } from 'express';
import { upload } from '../middlewares/imageUploadMiddleware.js';
import { loginRequired } from '../middlewares/loginRequired.js';
import { boardService } from '../services/boardService.js';
import { commentService } from '../services/commentService.js';

const commentRouter = Router();
const imgupload = upload.single('boardImage');

// 커뮤니티 등록
commentRouter.post('/:boardId', loginRequired, imgupload, async (req, res, next) => {
  try {
    const userId = req.currentUserId;
    const { boardId } = req.params;
    const { content } = req.body;

    const newComment = await commentService.addComment({
      userId,
      boardId,
      content,
    });

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

commentRouter.put('/:boardId', loginRequired, imgupload, async (req, res, next) => {
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

commentRouter.get('/:boardId', async (req, res, next) => {
  try {
    const { boardId } = req.params;

    const board = await boardService.getBoard({ boardId });

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
});

commentRouter.get('/', async (req, res, next) => {
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

commentRouter.delete('/:boardId', loginRequired, async (req, res, next) => {
  try {
    const { boardId } = req.params;

    await boardService.deleteBoard({ boardId });

    res.status(200).json({ message: '커뮤니티 삭제 성공' });
    return;
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
