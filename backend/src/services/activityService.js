import { Activity } from '../db/models/Activity.js';

class activityService {
  // create/ post
  static async getactivity({ groupId, userId, name, usedDate, state, actCategoryId, profileImg }) {
    const activityUser = {
      groupId,
      userId,
      name,
      usedDate,
      state,
      actCategoryId,
      profileImg,
    };
    return activityUser;
  }
}

export { activityService };
