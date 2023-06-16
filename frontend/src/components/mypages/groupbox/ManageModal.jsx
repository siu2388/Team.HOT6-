import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import * as API from '../../../api/index';

export default function ManageModal({
  setIsManageModalOpen,
  waitingMembers,
  waitingActivity,
  onClickAcceptMember,
  onClickRefuseMember,
  onClickAcceptActivity,
  onClickRefuseActivity,
}) {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const closeManageModal = () => {
    setIsManageModalOpen(false);
  };

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
  };

  const openActModal = () => {
    setIsJoinModalOpen(false);
  };

  const onClickTumblerText = index => {
    const activity = waitingActivity.result[index];

    if (selectedActivity && selectedActivity._id === activity._id) {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activity);
      console.log(`backend/uploads/${activity.proofImg}`);
    }
  };

  const resetSelectedActivity = () => {
    setSelectedActivity(null);
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>그룹 관리</ModalTitle>
          <ModalCloseButton onClick={closeManageModal}>X</ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <ButtonContainer>
            <JoinButton onClick={openJoinModal} active={isJoinModalOpen}>
              가입신청
            </JoinButton>
            <ActButton onClick={openActModal} active={!isJoinModalOpen}>
              활동체크
            </ActButton>
          </ButtonContainer>
          {isJoinModalOpen ? (
            <MembersInfo>
              {waitingMembers.length > 0 ? (
                waitingMembers?.map(el => (
                  <MemberItem key={el._id}>
                    <MemberNameBox>
                      <Avatar alt="멤버 이미지" src={`${API.imgUrl}${el.userId.profileImg}`} />
                      <MemberText>
                        {el.userId.name}({el.userId.nickname})
                      </MemberText>
                    </MemberNameBox>
                    <ManageButton>
                      <AcceptButton onClick={onClickAcceptMember(el.userId._id)}>수락</AcceptButton>
                      <RejectButton onClick={onClickRefuseMember(el.userId._id)}>거절</RejectButton>
                    </ManageButton>
                  </MemberItem>
                ))
              ) : (
                <ErrorText>가입 신청 내역이 없습니다.</ErrorText>
              )}
            </MembersInfo>
          ) : (
            <MembersInfo>
              {waitingActivity.result.length > 0 ? (
                waitingActivity.result.map((activity, index) => (
                  <MemberItem key={activity._id}>
                    <MemberNameBox>
                      {console.log(activity)}
                      <Avatar
                        alt="멤버 이미지"
                        src={`${API.imgUrl}${activity.userId.profileImg}`}
                      />
                      <MemberText>
                        {activity.userId.name}
                        <span>{activity.usedDate.slice(0, 10)}</span>
                      </MemberText>
                      <TumblerText onClick={() => onClickTumblerText(index)}>
                        {activity.category === 'tumbler' ? '📷 텀블러' : '📷다회용기'}
                      </TumblerText>
                    </MemberNameBox>
                    <ManageButton>
                      <AcceptButton onClick={() => onClickAcceptActivity(index)}>인증</AcceptButton>
                      <RejectButton onClick={() => onClickRefuseActivity(index)}>반려</RejectButton>
                    </ManageButton>
                  </MemberItem>
                ))
              ) : waitingActivity.result.length === 0 ? (
                <ErrorText>활동 체크 대기 중인 멤버가 없습니다.</ErrorText>
              ) : (
                <ErrorText>데이터를 불러오는 중에 오류가 발생했습니다.</ErrorText>
              )}
              {selectedActivity && (
                <ImgBox>
                  <CloseButton onClick={resetSelectedActivity}>X</CloseButton>
                  <ImageWrapper>
                    <img src={`${API.imgUrl}${selectedActivity.proofImg}`} alt="Proof Image" />
                  </ImageWrapper>
                </ImgBox>
              )}
            </MembersInfo>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const ImgBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(3);
  text-align: center;
  z-index: 999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ffffff;
  border: none;
  color: #777777;
  font-size: 10px;
  width: 10px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  img {
    width: 80px;
    height: 80px;
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
  width: 35%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #777777;
  cursor: pointer;
  position: absolute;
  right: 3rem;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 25rem;
  height: 4rem;
  background-color: #9fdf9f;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 3rem;
`;

const JoinButton = styled.button`
  width: 9rem;
  height: 3rem;
  padding: 0.3rem;
  margin: 1.5rem;
  transition: background-color 0.3s;
  background-color: ${props => (props.active ? '#fff' : '#9fdf9f')};
  border-radius: 0.7rem;
`;

const ActButton = styled.button`
  width: 9rem;
  height: 3rem;
  padding: 0.3rem;
  margin: 1.5rem;
  transition: background-color 0.3s;
  background-color: ${props => (props.active ? '#fff' : '#9fdf9f')};
  border-radius: 0.7rem;
`;

const ManageButton = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AcceptButton = styled.button`
  margin-right: 1rem;
  margin-left: 1rem;
  width: 4.5rem;
  height: 2.5rem;
  background-color: #478a77;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;
const RejectButton = styled.button`
  width: 4.5rem;
  height: 2.5rem;
  background-color: #bab6b6;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MembersInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const MemberItem = styled.div`
  width: 43rem;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  padding: 1.2rem;
  justify-content: space-between;
`;

const MemberText = styled.span`
  font-size: 16px;
  margin-left: 10px;
  span {
    font-size: 1.2rem;
    margin-left: 1rem;
  }
`;

const MemberNameBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TumblerText = styled.button`
  font-size: 10px;
  margin-left: 10px;
  color: #999999;
`;

// const ContainerText = styled.button`
//   font-size: 10px;
//   margin-left: 10px;
//   color: #999999;
// `;

const ErrorText = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
  text-align: center;
  margin: 3rem 0;
`;
