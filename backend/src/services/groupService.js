import { Group } from '../db/models/Group.js';
import { User } from '../db/models/User.js';

class groupService {
  // create/ post
  static async addGroup({ groupOwner, title, totalNumOfMembers, description, thumbnail }) {
    const user = await User.findById({ loginedId: groupOwner });
    const newGroup = {
      groupOwner: user.id,
      title,
      totalNumOfMembers,
      description,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }
}

export { groupService };
