import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { ROUTE } from '../../../constants/routes/routeData';
import { res } from '../../../styles/responsive';
import * as API from '../../../api/index';

export default function ListBox({ group }) {
  return (
    <ListBoxWrap>
      <Link to={`${ROUTE.GROUP_DETAIL.link}/${group._id}`}>
        <ListBackImg img={`${API.imgUrl}${group?.thumbnail}`} />
        <ListContent>
          <TitleBox>
            <ListTitle>🌟 {group.title} 🌟</ListTitle>
            <ListDate>{group.createdAt}</ListDate>
          </TitleBox>
          <DescriptionBox>{group.description}</DescriptionBox>
          <ListMemberBox>
            <AvatarGroup max={4}>
              <Avatar
                alt="Remy Sharp"
                src={group.groupOwnerId ? `${API.imgUrl}${group.groupOwnerId.profileImg}` : ''}
                sx={{ width: '3rem', height: '3rem' }}
              />
            </AvatarGroup>
            <MemberNum>{group?.groupOwnerId?.nickname}</MemberNum>
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

  @media ${res.tablet} {
    width: 48%;
  }
  @media ${res.mobile} {
    width: 100%;
  }
`;

const ListBackImg = styled.div`
  width: 100%;
  padding-bottom: 64%;
  border-radius: 8px;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const ListContent = styled.div`
  width: 100%;
  padding: 2rem;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
`;

const ListTitle = styled.h4`
  margin-top: 1.8rem;
  font-size: 2.2rem;
  font-weight: 400;
  color: #2d2d2d;
`;

const ListDate = styled.p`
  margin-top: 1.3rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: #999;
`;

const ListMemberBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  gap: 0.5rem;
  .css-1ytufz-MuiAvatarGroup-root .MuiAvatar-root {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media ${res.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const MemberNum = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: #333;
  margin-top: 5px;
`;

const DescriptionBox = styled.p`
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 1.7rem;
  font-weight: 400;
  color: #818181;
  padding-left: 1rem;
`;
