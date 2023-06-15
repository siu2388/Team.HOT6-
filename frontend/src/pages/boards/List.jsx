import React, { useEffect, useState } from 'react';
import * as S from './list.styled';
import { ROUTE } from '../../constants/routes/routeData';
import { Link } from 'react-router-dom';
import * as API from '../../api/index';

export default function BoardList() {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    const getBoard = async () => {
      const result = await API.get('/boards');
      setBoardList(result.data);
    };
    getBoard();
  }, []);

  return (
    <S.Wrapper>
      <S.TitleBanner>
        <S.BannerImgBox>
          <img src="/images/main/main_sub02.png" alt="" />
        </S.BannerImgBox>
        <S.BTitle>커뮤니티</S.BTitle>
      </S.TitleBanner>
      <S.Container>
        <S.BoardTitleBox style={{ marginBottom: '2rem' }}>
          <S.BannerImgBox>
            <img src="/images/commons/textlogo.png" alt="" />
          </S.BannerImgBox>
          <S.BoardT>환경을 지키자</S.BoardT>
        </S.BoardTitleBox>
        <S.ReviewListContainer>
          <S.TitleUl>
            <S.ListLiNum>No.</S.ListLiNum>
            <S.ListLiTitle>제목</S.ListLiTitle>
            <S.ListLiWrite>작성자</S.ListLiWrite>
            <S.ListLiCreatedAt>작성일</S.ListLiCreatedAt>
          </S.TitleUl>
          {boardList?.boards?.map((board, index) => (
            <S.ContentUl key={board?._id}>
              <S.ListLiNum>{index + 1}</S.ListLiNum>
              <S.ListLiTitle>
                <S.Title>
                  <Link to={`${ROUTE.BOARDDETAIL.link}/${board?._id}`}>{board?.title}</Link>
                </S.Title>
              </S.ListLiTitle>
              <S.ListLiWrite>
                <S.Write>{board?.user?.nickname}</S.Write>
              </S.ListLiWrite>
              <S.ListLiCreatedAt>
                <S.CreatedAt>{board?.createdAt}</S.CreatedAt>
              </S.ListLiCreatedAt>
            </S.ContentUl>
          ))}
        </S.ReviewListContainer>
        <S.BtnBox>
          <S.BoardBtn>
            <Link to={ROUTE.BOARDWRITE.link}>글쓰기</Link>
          </S.BoardBtn>
        </S.BtnBox>
      </S.Container>
    </S.Wrapper>
  );
}
