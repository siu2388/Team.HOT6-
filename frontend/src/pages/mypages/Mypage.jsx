import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ManageModal from '../../components/mypages/groupbox/ManageModal';
import MyProfile from '../../components/mypages/profilebox/MyProfile';
import RewardPoints from '../../components/mypages/largebox/RewardPoints';
import {
  isErrorModalState,
  isSuccessModalState,
  updateState,
  userInfoState,
  userTokenState,
} from '../../stores';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constants/routes/routeData';
import { res } from '../../styles/responsive';
import * as API from '../../api/index';
import { Avatar, AvatarGroup } from '@mui/material';
import GroupWritePage from '../groups/Write';

export default function Mypage() {
  const [userInfo] = useRecoilState(userInfoState);
  const [isEditModalOpen, setIsEditModalOpen]= useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('나의그룹');
  const [myGroup, setMyGroup] = useState([]);
  const [waitingMembers, setWaitingMembers] = useState([]);
  const [waitingActivity, setWaitingActivity] = useState([]);
  const [userToken] = useRecoilState(userTokenState);
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [update, setUpdate] = useRecoilState(updateState);
  const [activities, setActivities] = useState([]);
  const [actPage, setActPage] = useState(1);

  useEffect(() => {
    const getActivities = async () => {
      const result = await API.get(`/activities?page=${actPage}`);
      setActivities(result.data);
    };

    getActivities();
  }, [actPage]);

  console.log(activities);

  useEffect(() => {
    if (!sessionStorage.getItem('userToken')) {
      navigate('/');
    }
  }, [userToken]);

  useEffect(() => {
    const getMyGroup = async () => {
      const result = await API.get(`/mygroups/${userInfo?.user?.groupId}`);
      setMyGroup(result.data);
    };
    if (userInfo?.user?.groupId) {
      getMyGroup();
    }
  }, [userInfo, update]);

  useEffect(() => {
    const getWaitingMembers = async () => {
      const result = await API.get(`/mygroups/${myGroup?.result?.[0]?.groupId?._id}/waiting`);
      setWaitingMembers(result.data);
    };
    if (myGroup?.result?.[0]?.groupId?._id) {
      getWaitingMembers();
    }
  }, [myGroup, update]);

  useEffect(() => {
    const getWaitingActivity = async () => {
      const result = await API.get(`/activities/${myGroup?.result?.[0]?.groupId?._id}/waiting`);
      setWaitingActivity(result.data);
    };
    console.log(getWaitingActivity);
    if (myGroup?.result?.[0]?.groupId?._id) {
      getWaitingActivity();
    }
  }, [myGroup]);

  console.log('waitingActivity!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', waitingActivity);
  console.log('mygroup!!!!!!!!!!!!!', myGroup);
  const navigate = useNavigate();

  const openManageModal = () => {
    setIsManageModalOpen(true);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const handleMenuItemClick = menuItem => {
    setActiveMenuItem(menuItem);
  };

  const onClickDelGroup = async () => {
    try {
      await API.delete(`/groups/${myGroup?.result[0]?.groupId?._id}`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '그룹을 삭제하였습니다.',
      });
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  const onClickDeleteGroup = async () => {
    try {
      await API.delete(`/mygroups/${myGroup?.result[0]?.groupId?._id}`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '그룹을 탈퇴하였습니다.',
      });
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  const onClickAcceptMember = userId => async () => {
    try {
      await API.put(`/mygroups/${myGroup?.result[0]?.groupId?._id}/${userId}/approval`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '수락하였습니다.',
      });
    } catch (err) {
      setIsScucessModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  const onClickRefuseMember = userId => async () => {
    try {
      await API.delete(`/mygroups/${myGroup?.result[0]?.groupId?._id}/${userId}/rejection`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '거절하였습니다..',
      });
    } catch (err) {
      setIsScucessModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  const onClickAcceptActivity = async index => {
    try {
      await API.put(`/${waitingActivity?.result[index]?._id}`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '수락하였습니다.',
      });
    } catch (err) {
      setIsScucessModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  const onClickRefuseActivity = async index => {
    try {
      await API.delete(`/${waitingActivity?.result[index]?._id}`);
      setUpdate(prev => prev + 1);
      setIsScucessModal({
        state: true,
        message: '거절하였습니다..',
      });
    } catch (err) {
      setIsScucessModal({
        state: true,
        message: err.response.data.message,
      });
    }
  };

  return (
    <Container>
      <GroupMembers>
        <MyProfile userInfo={userInfo} />
      </GroupMembers>
      <Card>
        <Menu>
          <Menubox
            onClick={() => handleMenuItemClick('나의그룹')}
            active={activeMenuItem === '나의그룹'}
          >
            <MenuItem>나의그룹</MenuItem>
          </Menubox>
          <Menubox
            onClick={() => handleMenuItemClick('나의챌린지')}
            active={activeMenuItem === '나의챌린지'}
          >
            <MenuItem>나의 챌린지</MenuItem>
          </Menubox>
          <Menubox
            onClick={() => handleMenuItemClick('적립조회')}
            active={activeMenuItem === '적립조회'}
          >
            <MenuItem>적립조회</MenuItem>
          </Menubox>
          <Menubox onClick={() => navigate(ROUTE.CHANGEINFO.link)}>
            <MenuItem>내정보수정</MenuItem>
          </Menubox>
        </Menu>
      </Card>
      <MenuContainer>
        {activeMenuItem === '나의그룹' &&
          (userInfo?.user?.groupId ? (
            <LargeBox>
              <GroupInfo>
                <GroupImage
                  alt="그룹 사진"
                  src={`${API.imgUrl}${myGroup?.result?.[0]?.groupId?.thumbnail}`}
                />
                <GroupDetails>
                  <GroupName>{myGroup?.result?.[0]?.groupId?.title}</GroupName>
                  <GroupRole>
                    <GroupRoleText>그룹장</GroupRoleText>
                    <GroupRoleName>
                      {myGroup?.result?.[0]?.groupId?.groupOwnerId?.name}
                    </GroupRoleName>
                  </GroupRole>
                  <GroupMembersCount>
                    <GroupMembersNum>인원</GroupMembersNum>
                    <GroupMembersImgBox>
                      <AvatarGroup max={4}>
                        {myGroup?.members?.map(member => (
                          <Avatar
                            key={member._id}
                            alt="Remy Sharp"
                            src={`${API.imgUrl}${member.profileImg}`}
                            sx={{ width: '3rem', height: '3rem' }}
                          />
                        ))}
                      </AvatarGroup>
                    </GroupMembersImgBox>
                    <GroupMembersCountText>
                      {myGroup?.members?.length}/{myGroup?.result?.[0]?.groupId?.totalNumOfMembers}
                    </GroupMembersCountText>
                  </GroupMembersCount>
                  <GroupCreation>
                    <GroupCreationText>생성일</GroupCreationText>
                    <GroupCreationDate>
                      {myGroup?.result?.[0]?.groupId?.createdAt}
                    </GroupCreationDate>
                  </GroupCreation>
                  <GroupButton>
                  {myGroup?.result?.[0]?.groupId?.groupOwnerId?._id === userInfo?.user?._id && (
                      <EditIcon onClick={openEditModal}><img src="/images/commons/pencil.png" /></EditIcon> 
                    )}
                    {myGroup?.result?.[0]?.groupId?.groupOwnerId?._id === userInfo?.user?._id ? (
                      <GroupLeaveButton onClick={onClickDelGroup}>그룹삭제</GroupLeaveButton>
                    ) : (
                      <GroupLeaveButton onClick={onClickDeleteGroup}>그룹탈퇴</GroupLeaveButton>
                    )}
                    {myGroup?.result?.[0]?.groupId?.groupOwnerId?._id === userInfo?.user?._id && (
                      <GroupManageButton onClick={openManageModal}>그룹관리</GroupManageButton>
                    )}

                    <GroupMoveButton
                      onClick={() =>
                        navigate(`${ROUTE.GROUP_DETAIL.link}/${myGroup?.result?.[0]?.groupId?._id}`)
                      }
                    >
                      이동
                    </GroupMoveButton>
                  </GroupButton>
                </GroupDetails>
              </GroupInfo>
            </LargeBox>
          ) : (
            <ErrorText>가입한 그룹이 없습니다.</ErrorText>
          ))}
        {activeMenuItem === '그룹관리' && <GroupManagement></GroupManagement>}
        {activeMenuItem === '적립조회' && (
          <PointInquiry>
            <RewardPoints activities={activities} actPage={actPage} setActPage={setActPage} />
          </PointInquiry>
        )}
        {activeMenuItem === '내정보수정' && <ProfileModification></ProfileModification>}
        {isManageModalOpen && (
          <ManageModal
            setIsManageModalOpen={setIsManageModalOpen}
            waitingMembers={waitingMembers}
            waitingActivity={waitingActivity}
            onClickAcceptMember={onClickAcceptMember}
            onClickRefuseMember={onClickRefuseMember}
            onClickAcceptActivity={onClickAcceptActivity}
            onClickRefuseActivity={onClickRefuseActivity}
          />
        )}
        {isEditModalOpen&& (
          <Modal>
            <ModalContent>
            <GroupWritePage isEdit={true} closeEditModal={closeEditModal} myGroup={myGroup}/>
            </ModalContent>
          </Modal>
          )}
      </MenuContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10rem;
`;

const GroupMembers = styled.div`
  margin-top: 13rem;
  margin-bottom: 4rem;
  width: 30rem;
  height: 35rem;
  background-color: #fff;
  border-radius: 0.8rem;
  padding: 1rem;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media (max-width: 1080px) {
    width: 80%;
  }

  @media (max-width: 767px) {
    height: 42rem;
  }
`;

const MenuContainer = styled.div`
  width: 100rem;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  align-items: center;
  @media ${res.tablet} {
    width: 90%;
  }
  @media ${res.mobile} {
    gap: 2rem;
  }
`;
const Card = styled.div`
  width: 52rem;
  background-color: #9fdf9f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 3rem;

  @media ${res.mobile} {
    width: 90%;
  }
`;

const Menu = styled.ul`
  width: 100%;
  display: flex;
  list-style-type: none;
  margin: 0.5rem;
  padding: 0;
`;

const Menubox = styled.button`
  width: 25%;
  padding: 1rem 0.3rem;
  margin: 0.5rem;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fff;
    border-radius: 0.7rem;
  }
  ${({ active }) =>
    active &&
    `
  background-color: #fff;
  border-radius: 0.7rem;
  `}
`;

const MenuItem = styled.li`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
  @media (max-width: 767px) {
    font-size: 2.2rem;
  }
`;

const LargeBox = styled.div`
  width: 85rem;
  background-color: #ffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  margin-top: 3rem;
  padding-top: 4rem;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media ${res.tablet} {
    justify-content: center;
    width: 75rem;
  }
  @media ${res.mobile} {
    flex-direction: column;
    width: 100%;
    gap: 2rem;
  }
`;

const GroupInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  @media ${res.tablet} {
    justify-content: space-evenly;
  }
  @media ${res.mobile} {
    flex-direction: column;
    gap: 2rem;
  }
`;

const GroupImage = styled.img`
  width: 22rem;
  margin-left: 3rem;
  margin-right: 3rem;
  margin-top: -1rem;

  @media ${res.mobile} {
    width: 70%;
    flex-direction: column;
    gap: 2rem;
  }
`;

const GroupDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;
  margin-bottom: 2rem;
`;

const GroupName = styled.p`
  font-size: 3rem;
  font-weight: 500;
  color: #333;
  margin-top: -2rem;
  margin-bottom: 2rem;
  @media ${res.mobile} {
    font-size: 4rem;
  }
`;

const GroupRole = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`;
const GroupRoleText = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #777;
  @media ${res.mobile} {
    font-size: 3rem;
  }
`;

const GroupRoleName = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: #777;
  @media ${res.mobile} {
    font-size: 2.4rem;
  }
`;

const GroupMembersNum = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #777;
  @media ${res.mobile} {
    font-size: 3rem;
  }
`;
const GroupMembersCount = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  gap: 1.5rem;
`;

const GroupMembersImgBox = styled.div`
  margin-left: 2rem;
  .MuiAvatar-root {
    width: 3rem !important;
    height: 3rem !important;
  }
`;

// const GroupMembersImage = styled.img`
//   width: 3rem;
//   height: 3rem;
//   border-radius: 50%;
//   margin-right: -1rem;
//   z-index: 1;
//   margin-top: 1rem;
// `;

const GroupMembersCountText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #777;
  @media ${res.mobile} {
    font-size: 2rem;
  }
`;
const GroupCreation = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const GroupCreationText = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #777;

  @media ${res.mobile} {
    font-size: 3rem;
  }
`;

const GroupCreationDate = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: #777;
  @media ${res.mobile} {
    font-size: 2rem;
  }
`;

const GroupButton = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 4rem;
  justify-content: flex-end;
`;

const GroupLeaveButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: #949494;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media ${res.mobile} {
    width: 15rem;
    height: 7rem;
  }
`;

const GroupManageButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: #478a77;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media ${res.mobile} {
    width: 15rem;
    height: 7rem;
  }
`;

const GroupMoveButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: #478a77;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  @media ${res.mobile} {
    width: 15rem;
    height: 7rem;
  }
`;
const GroupManagement = styled.div``;

const PointInquiry = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileModification = styled.div``;

const ErrorText = styled.p`
  font-size: 2rem;
  font-weight: 400;
  color: #111;
  margin: 3rem 0;
`;

const EditIcon = styled.button`
  img{
    width: 3rem;
    height: 3rem;
    }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  margin-right:35rem;
  width: 35rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;