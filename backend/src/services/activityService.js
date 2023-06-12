import { Activity } from '../db/models/Activity.js';

class activityService {
  static async addActivity({ userId, groupId, state, name, usedDate, category, proofImg }) {
    const newActivity = {
      userId,
      groupId,
      state: '대기',
      name,
      usedDate,
      category,
      proofImg,
    };
    return Activity.create({ newActivity });
  }

  static async getActivityInfo(groupId, year, month) {
    // 년도, 월에 해당하는 데이터 가져오기
    const activities = await Activity.find({
      groupId: groupId,
      state: '승인',
      usedDate: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      },
    });

    function countActivity(activities, activityType) {
      return activities.reduce((count, activity) => {
        console.log('11', activity);
        return activity.category === activityType ? count + 1 : count;
      }, 0);
    }

    const activityDataByDate = {};

    activities.forEach(activity => {
      const dateKey = activity.usedDate.toISOString().slice(0, 10); // 날짜 포맷 변경
      if (!activityDataByDate[dateKey]) {
        activityDataByDate[dateKey] = {
          date: dateKey,
          tumbler: 0,
          multipleContainers: 0,
          member: [],
        };
      }
      activityDataByDate[dateKey].tumbler += countActivity([activity], 'tumbler');
      activityDataByDate[dateKey].multipleContainers += countActivity(
        [activity],
        'multipleContainers',
      );
      if (activityDataByDate[dateKey].member.indexOf(activity.userId._id) === -1) {
        activityDataByDate[dateKey].member.push(activity.userId._id);
      }
    });

    const activityData = Object.values(activityDataByDate);

    return activityData;
  }
}

export { activityService };
