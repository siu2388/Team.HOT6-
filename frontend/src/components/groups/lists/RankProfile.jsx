import React from 'react';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import { res } from '../../../styles/responsive';

export default function RankProfile() {
  return (
    <ProfileBox>
      <ProfileContainer>
        <Avatar src="/images/commons/logo.png" sx={{ width: '6.8rem', height: '6.8rem' }} />
        <ProfileInfoBox>
          <ProfileName>깜장이</ProfileName>
          <ProfileId>cjt3591</ProfileId>
        </ProfileInfoBox>
      </ProfileContainer>
      <RankBox>
        <RankInfo>TOP1</RankInfo>
      </RankBox>
    </ProfileBox>
  );
}

const ProfileBox = styled.div`
  width: 32.5%;
  padding: 1.6rem 2rem;
  background-color: #fff;
  border-radius: 1rem;
  position: relative;

  @media ${res.mobile} {
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const ProfileInfoBox = styled.div``;

const ProfileName = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
  color: #111;
  margin-bottom: 1.2rem;
`;

const ProfileId = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: #d6d6d6;
`;

const RankBox = styled.div`
  width: 6.4rem;
  height: 2.4rem;
  background-color: #e75353;
  border-radius: 0 8px 0 8px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RankInfo = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: #fff;
  margin-top: -2px;
`;
