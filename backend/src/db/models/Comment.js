import { CommentModel } from '../schemas/comment.js';

class Comment {
  static async create({ newComment }) {
    const createdNewBoard = await CommentModel.create(newComment);
    return createdNewBoard;
  }

  static async findByBoard({ boardId }) {
    const board = await CommentModel.findById(boardId).populate('user');
    return board;
  }

  static async findAll(skip, limit) {
    const boards = await CommentModel.find()
      .populate('user')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await CommentModel.countDocuments();
    return { boards, count };
  }

  static async deleteByBoard({ boardId }) {
    await CommentModel.deleteOne({ _id: boardId });
    return { status: 'ok' };
  }

  // 그룹 정보 수정
  static async updateBoard({ _id: boardId, fieldToUpdate, newValue }) {
    const filter = { _id: boardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedBoard = await CommentModel.findOneAndUpdate(filter, update, option);
    return updatedBoard;
  }
}

export { Comment };
