import { GroupJoin } from '../db/models/GroupJoin.js';

class groupJoinService {
  // 그룹가입/ post
  static async addGroupJoin({ groupId, userId, state }) {
    const newGroupJoin = {
      groupOwner,
      title,
      memberCount,
      description,
      thumbnail,
    };
    const createdGroupJoin = await Group.create({
      newGroupJoin,
    });
    return createdGroupJoin;
  }
}

export { groupJoinService };
