import { GroupJoinModel } from '../schemas/groupJoin.js';

class GroupJoin {
  static async create(newGroupJoin) {
    const createdNewGroupJoin = await GroupJoinModel.create(newGroupJoin);
    return createdNewGroupJoin;
  }
  //코치님과 했던 코드
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
  //유저가 나의 그룹 조회
  static async findMyGroup() {
    const group = await GroupJoinModel.find({}).populate('userId').populate('groupId');
    console.log('group내그룹조회', group);
    return group;
  }

  static async findByGroupId({ groupId }) {
    const waitingList = await GroupJoinModel.find({ groupId: groupId, state: '대기' }).populate(
      'userId',
      'name nickname profileImg',
    );
    console.log('Waiting list', waitingList);
    return waitingList;
  }

  static async findAll() {
    const groupAllInfo = await GroupJoinModel.find({});
    return groupAllInfo;
  }
// 유저 가입 대기 -> 승인으로 관리자 승인에 의한 상태 변경 - 관리자용
  static async update({ groupId,userId }) {
    const filter = { groupId , userId, state:'대기'};
    const update = { $set: {state: '승인'} };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupJoinModel.findOneAndUpdate(filter, update, option);
    if (!updatedGroup) {
      return false;
    }
    return true;
  }

  static async deleteByUserId({ userId }) {
    const deletedGroup = await GroupJoinModel.deleteOne({ id: userId });
    const isDataDeleted = deletedGroup.deletedCount === 1;
    return isDataDeleted;
  }
}

export { GroupJoin };
