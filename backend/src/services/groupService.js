import { Group } from '../db/models/Group.js';

class groupService {
  // 그룹의 생성
  static async addGroup({
    groupOwnerId,
    title,
    totalNumOfMembers,
    description,
    createdAt,
    thumbnail,
  }) {
    const newGroup = {
      groupOwnerId,
      title,
      totalNumOfMembers,
      description,
      createdAt,
      thumbnail,
    };
    const createdGroup = await Group.create({ newGroup });
    return createdGroup;
  }

  // 그룹 중복 생성 방지용
  static async getGroupByOwnerId(groupOwnerId) {
    const group = await Group.findByGroupOwnerId(groupOwnerId);
    return group;
  }

  // //그룹의 목록 조회
  // static async getGroups(skip, limit) {
  //   const { groups, count } = await Group.findAndCountAll(skip, limit);
  //   return { groups, count };
  // }
  // 그룹의 목록 조회
static async getGroups(page, limit) {
  const skip = (page - 1) * limit;
  const { groups, count } = await Group.findAndCountAll(skip, limit);
  return { groups, count };
}

  // 그룹의 상세페이지 조회
  static async getMyGroup(groupId) {
    const myGroup = await Group.findBygroupId(groupId);
    return myGroup;
  }
  //그룹명 검색
  static async searchGroup({ title }, skip, limit) {
    const { filteredSearch, count } = await Group.findByTitle({ title }, skip, limit);
    console.log('group', filteredSearch);
    console.log('서비스쪽title', title);
    if (!filteredSearch) {
      const errorMessage =
        '그룹명 조회: 해당 이름을 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { filteredSearch, count };
  }

  //그룹 삭제
  static async deleteGroup({ groupId }) {
    const isDataDeleted = await Group.deleteById({ groupId });

    if (!isDataDeleted) {
      const errorMessage = 'Group 삭제: 해당 id를 가진 그룹이 없습니다. 다시 한 번 확인해 주세요.';
      throw new Error(errorMessage);
    }
    return { status: 'ok' };
  }
}
export { groupService };
