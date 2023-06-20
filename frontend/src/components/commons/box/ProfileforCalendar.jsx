import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import * as API from '../../../api/index';

export default function CalendarProfile({ member }) {
    if (!Array.isArray(member)) {
      return null;
    }
  
    return (
        <>
        {member.map((item, index) => (
          <ProfileWrap key={index}>
            <UserBox>
            <Avatar
                alt="내 프로필"
                src={`${API.imgUrl}${item?.profileImg}`}
                sx={{ width: 48, height: 48 }}
            />
            <UserName>
              {item?.nickname}
            </UserName>
        </UserBox>
            <Medal>
                🏅
            </Medal>
        </ProfileWrap>
        ))}
        </>
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
  justify-content: space-between;
`;

const UserName = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
`;

const UserBox = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap:2rem;
`;
const Medal = styled.p`
    font-size:3rem;
`;
