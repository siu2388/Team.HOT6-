import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RankProfile from '../../components/groups/lists/RankProfile';
import Search from '../../components/groups/lists/Search';
import { Button, Pagination } from '@mui/material';
import ListBox from '../../components/commons/box/ListBox';
import SubTitle from '../../components/commons/title/SubTitle';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants/routes/routeData';
import * as Api from '../../api/index';
import { res } from '../../styles/responsive';

export default function GroupList() {
  const [groupList, setGroupList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [groupRanks, setGroupRanks] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const result = await Api.get(`/groups?page=${page}`);
      setGroupList(result.data);
    };
    getGroups();
  }, [page]);

  useEffect(() => {
    const getRanks = async () => {
      const result = await Api.get('/activities/totalCount');
      setGroupRanks(result.data.totalCounts);
    };
    getRanks();
  }, []);

  console.log(groupRanks);

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const onChangePage = (_, value) => {
    setPage(value);
  };

  const onClickSearch = async () => {
    try {
      const result = await Api.get(`/searchgroups?title=${search}`);
      setGroupList(result?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GroupListWrap>
      <RankingBox>
        <Ranking>
          <Rankimage>
            <img src="/images/commons/rankearth.png" alt="사랑해 지구야 로고" />
          </Rankimage>
          <RankTitle>그룹 TOP 3</RankTitle>
        </Ranking>
        <RankProfileContainer>
          <RankProfile />
          <RankProfile />
          <RankProfile />
        </RankProfileContainer>
      </RankingBox>
      <GroupListContainer>
        <SubTitle title="GROUP" />
        <SearchContainer>
          <Search
            variant="contained"
            search={search}
            onChangeSearch={onChangeSearch}
            onClickSearch={onClickSearch}
          />
          <Button variant="contained">
            <Link to={ROUTE.GROUP_WRITE.link}>그룹등록</Link>
          </Button>
        </SearchContainer>
        <GroupLists>
          {groupList?.groups?.map(group => (
            <ListBox key={group.id} group={group} />
          ))}
        </GroupLists>
        <PagenationBox>
          <Pagination
            count={groupList?.totalPages}
            page={page}
            size="large"
            variant="outlined"
            color="primary"
            onChange={onChangePage}
          />
        </PagenationBox>
      </GroupListContainer>
    </GroupListWrap>
  );
}

const GroupListWrap = styled.div`
  width: 100%;
  padding-top: 70px;
  margin-bottom: 10rem;
`;

const RankingBox = styled.div`
  width: 100%;
  padding: 6.5rem 0;
  background-color: #111;
`;

const RankTitle = styled.h2`
  font-size: 3.6rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
  margin-bottom: 2.5rem;
`;

const RankProfileContainer = styled.div`
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  @media ${res.tablet} {
    width: 90%;
  }
  @media ${res.mobile} {
    flex-direction: column;
    gap: 2rem;
  }
`;

const GroupListContainer = styled.div`
  width: 1300px;
  margin: 0 auto;
  padding-top: 8rem;
  @media ${res.tablet} {
    width: 90%;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4.5rem;
  button {
    font-size: 1.5rem;
    padding: 0;
    a {
      width: 100%;
      height: 100%;
      font-size: 1.5rem;
      display: block;
      padding: 6px 16px;
    }
  }
`;

const GroupLists = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem 2%;
  margin-bottom: 8rem;
`;

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    font-size: 1.6rem;
  }
  svg {
    width: 3rem;
  }
`;

const Ranking = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-right: 7rem;
`;

const Rankimage = styled.div`
  img {
    padding-bottom: 4rem;
    width: 120px;
  }
`;
