import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

export default function MyProfile() {
  
return(
  <ProfileBox>
    <Avatar alt="내 프로필" src="/images/commons/kkam.png" sx={{ width: 60, height: 60 }} />
        <UserName>춘딩딩</UserName>
        <Email>example@example.com</Email>
        <InfoRow>
          <InfoItem>
            <InfoLabel>성별</InfoLabel>
            <InfoValue>남성</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Phone</InfoLabel>
            <InfoValue>010-1234-5678</InfoValue>
          </InfoItem>
        </InfoRow>
        <Separator />
        <EmojiRow>
          <EmojiItem>
            <Emoji>🥤</Emoji>
            <EmojiCount>3</EmojiCount>
          </EmojiItem>
          <EmojiItem>
            <Emoji>♻️</Emoji>
            <EmojiCount>10</EmojiCount>
          </EmojiItem>
        </EmojiRow>
  </ProfileBox>
  );
};

const ProfileBox = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const UserName = styled.p`
  font-size: 2.3rem;
  font-weight: 400;
  color: #777;
  margin-top: 2rem;
  `;

const Email = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #777;
  margin-top: 1.3rem;
  `;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  `;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 1.5rem;
  `;

const InfoLabel = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: #777;
`;

const InfoValue = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #777;
  margin-left:0.7rem;
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
  margin-top: 0.5rem;
`;

const EmojiItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
`;

const Emoji = styled.span`
  font-size: 2.8rem;
`;

const EmojiCount = styled.span`
  font-size: 2.5rem;
  margin-left: 0.5rem;
`;