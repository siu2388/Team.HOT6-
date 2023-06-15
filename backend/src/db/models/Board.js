import { BoardModel } from '../schemas/board.js';
import { GroupModel } from '../schemas/group.js';
import { ObjectId } from 'mongodb';

class Board {
  static async create({ newBoard }) {
    const createdNewBoard = await BoardModel.create(newBoard);
    return createdNewBoard;
  }

  static async findByBoard({ boardId }) {
    const board = await BoardModel.findById(boardId).populate('user');
    return board;
  }

  static async findAll(skip, limit) {
    const boards = await BoardModel.find()
      .populate('user')
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    const count = await BoardModel.countDocuments();
    return { boards, count };
  }

  static async deleteByBoard({ boardId }) {
    await BoardModel.deleteOne({ _id: boardId });
    return { status: 'ok' };
  }

  // 그룹 정보 수정
  static async updateBoard({ _id: boardId, fieldToUpdate, newValue }) {
    const filter = { _id: boardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedBoard = await BoardModel.findOneAndUpdate(filter, update, option);
    return updatedBoard;
  }
}

export { Board };
