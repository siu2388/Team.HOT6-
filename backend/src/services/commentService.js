import { Comment } from '../db/models/Comment.js';

class commentService {
  // 커뮤니티 등록
  static async addComment({ userId, boardId, content }) {
    const newComment = {
      user: userId,
      boardId,
      content,
    };
    return Comment.create({ newComment });
  }

  static async setBoard({ boardId, toUpdate }) {
    let updatedBoard = await Board.findByBoard({ boardId });

    if (!updatedBoard) {
      const errorMessage = '해당하는 커뮤니티가 없습니다.';
      throw new Error(errorMessage);
    }

    if (toUpdate.title) {
      const fieldToUpdate = 'title';
      const newValue = toUpdate.title;
      updatedBoard = await Comment.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      updatedBoard = await Comment.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    if (toUpdate.boardImage) {
      const fieldToUpdate = 'boardImage';
      const newValue = toUpdate.boardImage;
      updatedBoard = await Comment.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    return updatedBoard;
  }

  // 커뮤니티 상세 조회
  static async getBoard({ boardId }) {
    const board = await Comment.findByBoard({ boardId });
    return board;
  }

  // 커뮤니티 전체 글 조회
  static async getBoards(page, limit) {
    const skip = (page - 1) * limit;
    const { boards, count } = await Comment.findAll(skip, limit);

    return { boards, count };
  }

  static async deleteBoard({ boardId }) {
    await Comment.deleteByBoard({ boardId });

    return { status: 'ok' };
  }
}

export { commentService };
