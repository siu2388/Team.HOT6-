import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

export default function MemberProfileBox() {
  return (
    <ProfileWrap>
      <Avatar alt="내 프로필" src="/images/commons/kkam.png" sx={{ width: 48, height: 48 }} />
      <UserName>조정택 (깜장이)</UserName>
    </ProfileWrap>
  );
}

const ProfileWrap = styled.div`
  width: 100%;
  padding: 1.2rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.8rem;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }
`;

const UserName = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
`;
