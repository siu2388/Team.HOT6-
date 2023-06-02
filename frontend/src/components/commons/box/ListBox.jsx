import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function ListBox() {
  return (
    <ListBoxWrap>
      <Link to={`/groups/detail/${'groupId'}`}>
        <ListBackImg img="/images/groups/lists/thumnail.png" />
        <ListContent>
          <TitleBox>
            <ListTitle>3학년 1반 그룹</ListTitle>
            <ListDate>2023.01.01</ListDate>
          </TitleBox>
          <ListMemberBox>
            <AvatarGroup max={4}>
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Remy Sharp"
                src="/images/commons/logo.png"
                sx={{ width: 30, height: 30 }}
              />
            </AvatarGroup>
            <MemberNum>모집인원 13 / 15</MemberNum>
          </ListMemberBox>
        </ListContent>
      </Link>
    </ListBoxWrap>
  );
}

const ListBoxWrap = styled.div`
  width: 32%;
  border-radius: 8px;
  background-color: #fff;
`;

const ListBackImg = styled.div`
  width: 100%;
  padding-bottom: 64%;
  border-radius: 8px;
  background-image: ${({ img }) => `url(${img})`};
`;

const ListContent = styled.div`
  width: 100%;
  padding: 1rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const ListTitle = styled.h4`
  font-size: 1.8rem;
  font-weight: 400;
  color: #111;
`;

const ListDate = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: #999;
`;

const ListMemberBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .css-1ytufz-MuiAvatarGroup-root .MuiAvatar-root {
    width: 35px;
    height: 35px;
  }
`;

const MemberNum = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: #333;
  margin-top: 5px;
`;
