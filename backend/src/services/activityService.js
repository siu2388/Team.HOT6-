import { Activity } from '../db/models/Activity.js';

class activityService {
  static async addActivity({ loginedId, groupId, state, name, usedDate, category, proofImg }) {
    const newActivity = {
      loginedId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    };
    return Activity.create({ newActivity });
  }
  // static async addActivity() {}
  // static async removeActivity() {}
}

export { activityService };
