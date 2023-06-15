import React from 'react';
import * as S from './list.styled';
import { ROUTE } from '../../constants/routes/routeData';
import { Link } from 'react-router-dom';

export default function BoardList() {
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
          <S.ContentUl>
            <S.ListLiNum>3</S.ListLiNum>
            <S.ListLiTitle>
              <S.Title>
                <Link to={`${ROUTE.BOARDDETAIL.link}/${'id'}`}>제목</Link>
              </S.Title>
            </S.ListLiTitle>
            <S.ListLiWrite>
              <S.Write>닉네임</S.Write>
            </S.ListLiWrite>
            <S.ListLiCreatedAt>
              <S.CreatedAt>2022-01-01</S.CreatedAt>
            </S.ListLiCreatedAt>
          </S.ContentUl>
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
