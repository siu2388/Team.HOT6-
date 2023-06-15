import styled from 'styled-components';
import { res } from '../../styles/responsive';

export const Wrapper = styled.div`
  width: 100%;
  padding-top: 10rem;
`;

export const Container = styled.div`
  width: 1200px;
  margin: 8rem auto 10rem;
  min-height: calc(100vh - 500px);
  @media ${res.tablet} {
    width: 90% !important;
  }
  @media ${res.mobile} {
    .mobile {
      display: none;
    }
  }
`;

export const ReviewListContainer = styled.section`
  width: 100%;
`;

export const TitleUl = styled.ul`
  width: 100%;
  display: flex;
  padding: 3.6rem 0;
  border-top: 1px solid #111;
  border-bottom: 2px solid #d9d9d9;
  margin-bottom: 0;
  background-color: #fff;
`;

export const ListLiNum = styled.li`
  width: 11.66%;
  font-size: 1.6rem;
  font-weight: 400;
  color: #666;
  text-align: center;
  @media ${res.mobile} {
    display: none;
  }
`;
export const ListLiMountain = styled.li`
  width: 7.91%;
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
  text-align: center;
  @media ${res.mobile} {
    width: 12%;
  }
`;
export const ListLiTitle = styled.li`
  width: 58.33%;
  font-size: 1.6rem;
  font-weight: 500;
  color: #111;
  padding-left: 5.5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  a {
    color: #111;
  }
  @media ${res.mobile} {
    width: 45%;
    padding-left: 4rem;
  }
`;
export const ListLiWrite = styled.li`
  width: 10.41%;
  font-size: 1.6rem;
  font-weight: 500;
  color: #111;
  text-align: center;
  position: relative;
  @media ${res.mobile} {
    width: 17%;
  }
`;
export const ListLiCreatedAt = styled.li`
  width: 16%;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  @media ${res.mobile} {
    width: 17%;
  }
`;
export const ContentUl = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 2.4rem 0;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 0;
  background-color: #fff;
`;
export const Write = styled.span`
  width: 80px;
  padding: 0.8rem 0;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  margin: 0 auto;
`;

export const Title = styled.div`
  a {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
  }
  :hover {
  }
  &.on {
    font-weight: 700;
    text-decoration: underline;
  }
`;

export const CreatedAt = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  color: #111;
  padding-left: 1rem;
  @media (max-width: 920px) {
    font-size: 1.2rem;
  }
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3rem;

  .ant-pagination-prev:hover {
    button {
      border-color: #01881c;
      color: green;
    }
  }
  .ant-pagination-next:hover {
    button {
      border-color: #01881c;
      color: green;
    }
  }
  .ant-pagination-item:hover {
    border-color: #01881c;
    a {
      color: green;
    }
  }

  .ant-pagination-item-active {
    border-color: #01881c;
    a {
      color: green;
    }
  }
  @media ${res.mobile} {
    .ant-pagination {
      font-size: 1.4rem;
    }
    .ant-pagination-item {
      min-width: 3.2rem;
      width: 3.2rem;
      height: 3.2rem;
      line-height: 3rem;
      margin-right: 0.8rem;
      a {
        padding: 0 0.3rem;
      }
    }
    .ant-pagination-prev .ant-pagination-item-link,
    .ant-pagination-next .ant-pagination-item-link {
      font-size: 1.4rem;
      span {
        display: block;
        margin-top: -1px;
      }
    }
    .ant-pagination-prev,
    .ant-pagination-next,
    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      min-width: 3.2rem;
      height: 3.2rem;

      line-height: 3.2rem;
    }
  }
`;

export const TitleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 8rem 0;
  background-color: #111;
`;

export const BannerImgBox = styled.div`
  width: 8rem;
  img {
    width: 100%;
  }
`;

export const BoardTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BTitle = styled.h2`
  font-size: 5rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
`;

export const BoardT = styled.h4`
  font-size: 2.4rem;
  font-weight: 400;
  color: #111;
`;

export const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3rem;
`;

export const BoardBtn = styled.button`
  a {
    display: block;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    font-weight: 500;
    color: #fff;
  }
  background-color: #01881c;
  border-radius: 4px;
`;

export const PaginationBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
