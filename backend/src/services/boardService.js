import { Board } from '../db/models/Board.js';
import { DateTime } from 'luxon';

class boardService {
  // 커뮤니티 등록
  static async addBoard({ userId, title, description, boardImage }) {
    const newBoard = {
      user: userId,
      title,
      description,
      boardImage,
    };
    return Board.create({ newBoard });
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
      updatedBoard = await Board.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = 'description';
      const newValue = toUpdate.description;
      updatedBoard = await Board.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    if (toUpdate.boardImage) {
      const fieldToUpdate = 'boardImage';
      const newValue = toUpdate.boardImage;
      updatedBoard = await Board.updateBoard({ _id: boardId, fieldToUpdate, newValue });
    }

    return updatedBoard;
  }

  // 커뮤니티 상세 조회
  static async getBoard({ boardId }) {
    const board = await Board.findByBoard({ boardId });
    return board;
  }

  // 커뮤니티 전체 글 조회
  static async getBoards(page, limit) {
    const skip = (page - 1) * limit;
    const { boards, count } = await Board.findAll(skip, limit);

    return { boards, count };
  }

  static async deleteBoard({ boardId }) {
    await Board.deleteByBoard({ boardId });

    return { status: 'ok' };
  }
}

export { boardService };
