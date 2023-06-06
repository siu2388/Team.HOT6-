import { Group } from '../db/models/Group.js';

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, memberCount, description, thumbnail }) {
    const newGroup = {
      groupOwner,
      title,
      memberCount,
      description,
      thumbnail,
    };
    const createdGroup = await Group.create({
      newGroup,
    });
    return createdGroup;
  }
}

export { groupService };
