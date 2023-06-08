import { Group } from '../db/models/Group.js';
import { GroupJoin } from '../db/models/GroupJoin.js';
import { v4 as uuidv4 } from "uuid";

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, totalNumOfMembers, description, thumbnail }) {
    const id = uuidv4();
    const newGroup = {
      id,
      groupOwner,
      title,
      totalNumOfMembers,
      description,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }

  static async getGroups() {
    const Groups = await Group.findAll();
    return Groups;
  }

  static async getMyGroup() {
    const MyGroup = await Group.findOne();
    return MyGroup;
  }

  static async deleteGroup({ groupId }) {
    const isDataDeleted = await Group.deleteById({ groupId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 삭제: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    return { status: 'ok' };
  }
}
export { groupService };
