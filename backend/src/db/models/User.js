import { UserModel } from '../schemas/user.js';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  //유저의 그룹 가입시
  static async findByUserId({ userId }) {
    const user = await UserModel.findById({ _id: userId });
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

  static async update({ loginedId, fieldToUpdate, newValue }) {
    const filter = { _id: loginedId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  //유저가 그룹 가입 시 groupId 업데이트
  static async updateGroupId({ userId, fieldToUpdate, newValue }) {
    const filter = { _id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  // 유저의 groupId 삭제
  static async deleteGroupId({ groupId, userId }) {
    const filter = { groupId, userId };
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
