import { Activity } from '../db/models/Activity.js';

class activityService {
  static async addActivity({ userId, groupId, state, name, usedDate, category, proofImg }) {
    const newActivity = {
      userId,
      groupId,
      state,
      name,
      usedDate,
      category,
      proofImg,
    };
    return Activity.create({ newActivity });
  }

  static async getActivityInfo(groupId, year, month) {
    const activities = await Activity.find({
      groupId: groupId,
      state: '승인',
      usedDate: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    const activityCount = {
      tumbler: 0,
      multipleContainers: 0,
    };

    for (const activity of activities) {
      const { category } = activity;
      activityCount[category]++;
    }

    const response = {
      activities: activities.map(activity => ({
        usedDate: activity.usedDate,
        name: activity.name,
        category: activity.category,
      })),
    };

    return { ...response, ...activityCount };
  }

  // static async addActivity() {}
  // static async removeActivity() {}
}

export { activityService };
