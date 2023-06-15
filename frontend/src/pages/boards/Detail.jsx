import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './detail.styled';

export default function BoardDetail() {
  return (
    <>
      <S.BoardDetailContainer>
        <S.BoardDetailTitleContainer>
          <S.DetailWriterAndDateBox>
            <S.DetailProfileImg></S.DetailProfileImg>
            <S.DetailTitleAndDate>
              <S.BoardDetailTitle>제목</S.BoardDetailTitle>
              <S.DetailWriterAndDate>
                <S.BoardWriter>작성자</S.BoardWriter>
                <S.DetailDate>Date : 2022-01-01</S.DetailDate>
              </S.DetailWriterAndDate>
            </S.DetailTitleAndDate>
          </S.DetailWriterAndDateBox>
        </S.BoardDetailTitleContainer>
        <S.BoardDetailContentContainer>
          <S.DetailContentBox>
            <img src="/images/commons/kkam.png" alt="" />
          </S.DetailContentBox>
          <S.BoardContent>
            <pre>게시글 내용이 들어갑니다.</pre>
          </S.BoardContent>
          <S.LikeAndUnLikeBox>
            <S.LikeAndUnLIkeContainer>
              <S.DefaultBtn>
                <img src="/images/board/likeBtn.png" />
              </S.DefaultBtn>
              <S.LikeText style={{ color: '#FFD600' }}>3</S.LikeText>
            </S.LikeAndUnLIkeContainer>
            <S.LikeAndUnLIkeContainer>
              <S.DefaultBtn>
                <img src="/images/board/unLikeBtn.png" />
              </S.DefaultBtn>
              <S.LikeText style={{ color: '#828282' }}>4</S.LikeText>
            </S.LikeAndUnLIkeContainer>
          </S.LikeAndUnLikeBox>
        </S.BoardDetailContentContainer>
        <S.BoardBtnContainer>
          <Link to="/boards">
            <S.BoardDefaultBtn>목록으로</S.BoardDefaultBtn>
          </Link>
          <S.BoardDefaultBtn>수정하기</S.BoardDefaultBtn>
          <S.BoardDefaultBtn>삭제하기</S.BoardDefaultBtn>
        </S.BoardBtnContainer>
        <S.CommentTitleBox>
          <div>
            <img src="/images/board/commentTitle.png" />
          </div>
          <S.CommentTitle>댓글</S.CommentTitle>
        </S.CommentTitleBox>
        <S.CommentContainer>
          <S.CommentTextareaBox>
            <S.CommentTextarea
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다. 입력해주세요."
              name="comment"
            />
            <S.CommentSubmitBox>
              <S.CommentLengthBox>0/100</S.CommentLengthBox>
              <S.CommentSubmit>등록하기</S.CommentSubmit>
            </S.CommentSubmitBox>
          </S.CommentTextareaBox>
        </S.CommentContainer>
        <S.CommentErrorText></S.CommentErrorText>
      </S.BoardDetailContainer>
    </>
  );
}
