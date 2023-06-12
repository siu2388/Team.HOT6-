import { Activity } from '../db/models/Activity.js';

class activityService {
  // 활동 등록
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

  // 그룹 활동 조회
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

  static async getActivities() {
    const activities = await Activity.findAll();
    return activities;
  }

  // 활동 신청 승인 대기 조회
  static async getWaitingList({ groupId }) {
    const waitingList = await Activity.findByGroupId({ groupId });
    return waitingList;
  }

  // 활동 신청 승인 수락
  static async setActivity(activityId) {
    try {
      const activity = await Activity.findById(activityId);

      if (!activity) {
        return false;
      }

      activity.state = '승인';

      await activity.save();

      return true;
    } catch (error) {
      throw error;
    }
  }
}

export { activityService };
