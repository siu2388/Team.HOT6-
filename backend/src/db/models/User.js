import { UserModel } from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByUserId({ userId }) {
    const user = await UserModel.findOne({ userId });
    return user;
  }

  static async findById({ loginedId }) {
    const user = await UserModel.findById(loginedId);
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // 나의 그룹 조회
  static async findMyGroup({ userId }) {
    const group = await UserModel.find({ _id: userId }, 'groupId').populate({
      path: 'groupId',
      populate: { path: 'groupOwnerId' },
    });
    return group;
  }

  // groupId 같은 멤버 조회용
  static async findGroupMembers({ groupId }) {
    const foundMembers = await UserModel.find(
      { groupId },
      'userId name nickname phone profileImg groupId',
    );
    return foundMembers;
  }

  static async update({ loginedId, fieldToUpdate, newValue }) {
    const filter = { _id: loginedId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  //유저가 그룹 가입 시, 그룹 생성 시  groupId 업데이트
  static async updateGroupId({ userId, groupId }) {
    const filter = { _id: userId };
    const update = { $set: { groupId: groupId } };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 유저의 groupId 삭제
  static async deleteGroupId({ groupId, userId }) {
    const filter = { groupId, _id: userId };
    const update = { $set: { groupId: null } };
    const option = { returnOriginal: false };

    const updatedGroup = await UserModel.findOneAndUpdate(filter, update, option);
    if (!updatedGroup) {
      return false;
    }
    return true;
  }
}
export { User };
