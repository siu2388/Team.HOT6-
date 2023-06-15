import React from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { res } from '../../../styles/responsive';

const RewardPoints = ({ activities, actPage, setActPage }) => {
  const onClickActPage = (_, page) => {
    setActPage(page);
  };
  return (
    <LargeBox>
      {activities?.activities?.map(item => (
        <SmallBox key={item._id}>
          <TumblerContent>
            <p>
              {item?.usedDate?.slice(0, 10)}{' '}
              {item?.category === 'multipleContainers' ? '다회용기' : '텀블러'} 사용
            </p>
            <p>{item?.category === 'multipleContainers' ? '♻️' : '🥤'}+1</p>
          </TumblerContent>
        </SmallBox>
      ))}

      <PaginationContainer>
        <Pagination count={actPage} size="large" onChange={onClickActPage} />
      </PaginationContainer>
    </LargeBox>
  );
};

const LargeBox = styled.div`
  width: 90%;
  background-color: #ffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  margin-top: 3rem;
  padding-bottom: 3rem;
  padding-top: 3rem;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  flex-direction: column;
`;

const SmallBox = styled.div`
  width: 50%;
  height: 100%;
  background-color: #f9f9f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  margin: 0.7rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media ${res.tablet} {
    width: 100%;
  }
`;

const TumblerContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  p {
    font-size: 1.6rem;
    font-weight: 400;
    color: #111;
  }
`;

// const ContainerContent = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

export default RewardPoints;
