import { Group } from '../db/models/Group.js';
import { User } from '../db/models/User.js';

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
    const Groups = await Group.findAll();
    return Groups;
  }
}

export { groupService };
