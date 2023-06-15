import React from 'react';
import * as S from './write.styled';

export default function BoardWrite({ isEdit }) {
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.BoardWriteTitle>커뮤니티 {isEdit ? '수정' : '작성'}</S.BoardWriteTitle>
          <S.BoardWriteForm>
            <S.WritePasswordBox></S.WritePasswordBox>
            <S.DefaultInputBox>
              <p>제목</p>
              <S.DefaultInput type="text" placeholder="제목을 작성해주세요." />
            </S.DefaultInputBox>
            <S.TextareaBox>
              <p>내용</p>
              <textarea />
            </S.TextareaBox>
            <S.PhotoClipBox>
              <p>사진 첨부</p>
              <S.PhotoContainer>
                <S.PhotoClipBtnBox>
                  <S.FileLabel htmlFor="file01">+</S.FileLabel>
                </S.PhotoClipBtnBox>
              </S.PhotoContainer>
            </S.PhotoClipBox>
            <S.cancleBtnBox>
              <S.FormSubmitBtn type="submit">{isEdit ? '수정' : '등록'}하기</S.FormSubmitBtn>
              <S.FormCancleBtn type="button">취소하기</S.FormCancleBtn>
            </S.cancleBtnBox>
          </S.BoardWriteForm>
        </S.Container>
      </S.Wrapper>
    </>
  );
}
