import { GroupJoinModel } from '../schemas/groupJoin.js';

class GroupJoin {
  static async create(newGroupJoin) {
    const createdNewGroupJoin = await GroupJoinModel.create(newGroupJoin);
    return createdNewGroupJoin;
  }

  static async findById({ id }) {
    console.log('1', id);
    const group = await GroupJoinModel.findOne({ id });
    console.log('group', group);
    return group.groupOwnerId;
  }

  static async findByUserId({ userId }) {
    const group = await GroupJoinModel.findOne({ userId });
    return group;
  }

  static async findAll() {
    const groupAllInfo = await GroupJoinModel.find({});
    return groupAllInfo;
  }

  static async update({ loginedId }) {
    const filter = { loginedId };
    const update = { state: '승인' };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupJoinModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }

  static async deleteByLoginedId({ loginedId }) {
    const deletedGroup = await GroupJoinModel.deleteOne({ id: loginedId });
    const isDataDeleted = deletedGroup.deletedCount === 1;
    return isDataDeleted;
  }
}

export { GroupJoin };
