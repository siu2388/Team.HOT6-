import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import * as API from '../../../api/index';

export default function MyProfile({ userInfo }) {
  return (
    <ProfileBox>
      <Avatar
        alt="내 프로필"
        src={`${API.imgUrl}${userInfo?.user?.profileImg}`}
        sx={{ width: 80, height: 80 }}
      />
      <UserName>{userInfo?.user?.name}</UserName>
      <Email>{userInfo?.user?.nickname}</Email>
      <InfoRow>
        <InfoItem>
          <InfoLabel>☎️</InfoLabel>
          <InfoValue>{userInfo?.user?.phone}</InfoValue>
        </InfoItem>
      </InfoRow>
      <Separator />
      <Credit>
        <CreditNum>⭐️ {userInfo?.totalCount}</CreditNum>
      </Credit>
      <EmojiRow>
        <EmojiItem>
          <Emoji>🥤</Emoji>
          <EmojiCount>{userInfo?.tumblerCount}</EmojiCount>
        </EmojiItem>
        <EmojiItem>
          <Emoji>♻️</Emoji>
          <EmojiCount>{userInfo?.multipleContainersCount}</EmojiCount>
        </EmojiItem>
      </EmojiRow>
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1px;
`;
const UserName = styled.p`
  font-size: 3rem;
  font-weight: 400;
  color: #393939;
  margin-top: 2rem;
  @media (max-width: 767px) {
    font-size: 3.2rem;
  }
`;

const Email = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: #777;
  margin-top: 1.3rem;
  @media (max-width: 767px) {
    font-size: 2.4rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1.5rem;
`;

const InfoLabel = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: #3c3c3c;
  margin-top: -0.2rem;
  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const InfoValue = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #777;
  margin-left: 0.7rem;
  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  margin: 1.5rem 0;
`;

const EmojiRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.5rem;
`;

const EmojiItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 2rem;
  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

const EmojiCount = styled.span`
  font-size: 2rem;
  margin-left: 0.2rem;
  color: #777777;
  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

const Credit = styled.div`
  margin-right: 2rem;
  margin-bottom: 0.5rem;
`;
const CreditNum = styled.p`
  font-size: 3rem;
  color: #e7c448;
  font-weight: bold;
`;
