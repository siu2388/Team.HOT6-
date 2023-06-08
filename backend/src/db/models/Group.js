import { GroupModel } from '../schemas/group.js';

class Group {
  static async create({ newGroup }) {
    const createdNewGroup = await GroupModel.create(newGroup);
    return createdNewGroup;
  }

  static async findById({ groupId }) {
    const group = await GroupModel.findOne({ id: groupId });
    return group;
  }

  static async findAll() {
    const groupAllInfo = await GroupModel.find({});
    return groupAllInfo;
  }

  static async update({ groupId, fieldToUpdate, newValue }) {
    const filter = { id: groupId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedGroup = await GroupModel.findOneAndUpdate(filter, update, option);
    return updatedGroup;
  }

  static async delete(groupId) {
    const deletedGroup = await GroupModel.deleteOne(groupId);
    return deletedGroup;
  }
}

export { Group };
