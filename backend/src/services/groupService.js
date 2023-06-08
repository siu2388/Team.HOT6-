import { Group } from '../db/models/Group.js';
import { GroupJoin } from '../db/models/GroupJoin.js';

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, totalNumOfMembers, description, thumbnail }) {
    const newGroup = {
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
    const groups = await Group.findAll();
    return groups;
  }

  static async groupJoin({ groupId, userId, state }) {
    const newGroupJoin = {
      groupId,
      userId,
      state,
    };

    const groupJoins = await GroupJoin.create({ newGroupJoin });
    return groupJoins;
  }

  static async getUserGroup({ userId }) {
    const group = await GroupJoin.findByUserId({ userId });
    return group;
  }
}

export { groupService };
