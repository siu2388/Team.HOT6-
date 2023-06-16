import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MemberProfileBox from '../../components/commons/box/MemberProfileBox';
import GroupCalendar from '../../components/groups/details/Calendar';
import { useParams } from 'react-router-dom';
import * as API from '../../api/index';
import { res } from '../../styles/responsive';
import { useRecoilState } from 'recoil';
import { isErrorModalState, isSuccessModalState, userInfoState } from '../../stores';

export default function GroupDetailPage() {
  const [groupData, setGroupData] = useState([]);
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [userInfo] = useRecoilState(userInfoState);

  const groupId = useParams().id;

  useEffect(() => {
    const getGroupData = async () => {
      const result = await API.get(`/groups/${groupId}`);
      setGroupData(result.data);
    };
    getGroupData();
  }, []);

  const handleGroupJoin = async () => {
    try {
      await API.post(`/mygroups/${groupId}`);
      setIsScucessModal({
        state: true,
        message: '그룹신청에 성공하였습니다. 그룹장 수락 후 그룹 활동이 활성화 됩니다.',
      });
    } catch (err) {
      setIsErrorModal({ state: true, message: err.response.data.message });
    }
  };

  return (
    <GroupDetailWrap>
      <GroupDetailContainer>
        <GroupName>
          <GroupTitle>{groupData?.myGroup?.title}</GroupTitle>
        </GroupName>
        <DetailContent01>
          <DetailInfoBox>
            <DetailThumbnail img={`${API.imgUrl}${groupData?.myGroup?.thumbnail}`} />
            <DetailInfo>
              <div>
                <UserProfile>
                  <Avatar
                    alt="내 프로필"
                    src={`${API.imgUrl}${groupData?.myGroup?.groupOwnerId?.profileImg}`}
                    sx={{ width: 40, height: 40 }}
                  />
                  <UserName>{groupData?.myGroup?.groupOwnerId?.name}</UserName>
                </UserProfile>
                <UserBox>
                  <span>생성일</span>
                  <span>{groupData?.myGroup?.createdAt}</span>
                </UserBox>
                <UserBox>
                  <span>모집인원</span>
                  <span>{groupData?.myGroup?.totalNumOfMembers}명</span>
                </UserBox>
                <GroupDescription>{groupData?.myGroup?.description}</GroupDescription>
              </div>
              {sessionStorage.getItem('userToken') && (
                <div>
                  <Button
                    style={{
                      width: '180px',
                      height: '40px',
                      fontSize: '2.3rem',
                      fontFamily: 'Do Hyeon',
                    }}
                    variant="contained"
                    color="success"
                    onClick={handleGroupJoin}
                    disabled={groupData?.myGroup?.groupOwnerId?._id === userInfo?.user?._id}
                  >
                    그룹신청
                  </Button>
                </div>
              )}
            </DetailInfo>
          </DetailInfoBox>
          <GroupMemberBox>
            <GroupMemberTitleBox>
              <GroupMemberTitle>그룹 명단</GroupMemberTitle>
              <MemberNumBox>
                <img src="/images/commons/user.png" alt="" />
                <MemberNum>
                  {groupData?.members?.length} / {groupData?.myGroup?.totalNumOfMembers}
                </MemberNum>
              </MemberNumBox>
            </GroupMemberTitleBox>
            <GroupMembers>
              {groupData?.members?.map(member => (
                <MemberProfileBox member={member} key={member?._id} />
              ))}
            </GroupMembers>
          </GroupMemberBox>
        </DetailContent01>
        <GroupCalendar title={groupData?.myGroup?.title} userInfo={userInfo} />
      </GroupDetailContainer>
    </GroupDetailWrap>
  );
}
const GroupDetailWrap = styled.div`
  width: 100%;
  padding-top: 14rem;
  margin-bottom: 15rem;
`;

const GroupDetailContainer = styled.div`
  width: 1300px;
  margin: 0 auto;

  @media ${res.tablet} {
    width: 90%;
  }
`;

const GroupTitle = styled.h2`
  font-size: 5rem;
  font-weight: 500;
  color: #27641b;
  margin-bottom: 7.5rem;
`;

const DetailContent01 = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8rem;
`;

const DetailInfoBox = styled.div`
  display: flex;
  gap: 4rem;

  @media (max-width: 1080px) {
    width: 100%;
    justify-content: center;
  }
`;

const DetailThumbnail = styled.div`
  width: 30rem;
  height: 30rem;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: center;
  border-radius: 0.8rem;

  @media (max-width: 1080px) {
    width: 40rem;
    justify-content: center;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const UserName = styled.p`
  font-size: 3rem;
  font-weight: 400;
  color: #2f2f2f;
`;

const UserBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  margin-bottom: 1rem;

  span {
    font-size: 2rem;
    font-weight: 400;
  }
  span:nth-child(1) {
    color: #132eba;
  }

  span:nth-child(2) {
    color: #373737;
  }

  &:last-of-type {
    margin-bottom: 2.4rem;
  }
`;

const GroupMemberBox = styled.div`
  @media (max-width: 1080px) {
    display: none;
  }
`;

const GroupMemberTitleBox = styled.div`
  width: 35rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
const GroupMemberTitle = styled.h4`
  font-size: 2.5rem;
  font-weight: 400;
  color: #111;
  margin-left: 1rem;
`;

const MemberNumBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const MemberNum = styled.span`
  font-size: 1.8rem;
  font-weight: 400;
  color: #111;
  margin-right: 1.5rem;
`;

const GroupMembers = styled.div`
  width: 100%;
  height: 26rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1rem;
  overflow-y: auto;
  border: 1px solid #d9d9d9;
`;

const GroupDescription = styled.p`
  max-width: 40rem;
  font-size: 2rem;
  font-weight: 400;
  color: #595858;
  line-height: 1.2;
`;

const GroupName = styled.div`
  display: flex;
  justify-content: center;
`;
