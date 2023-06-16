import React, { useEffect, useState } from 'react';
import * as S from './write.styled';
import * as API from '../../api/index';
import { useRecoilState } from 'recoil';
import { imgFileState, isErrorModalState, isSuccessModalState } from '../../stores';
import FileUpload from '../../components/commons/FileUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE } from '../../constants/routes/routeData';
import axios from 'axios';

export default function BoardWrite({ isEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [imgFile] = useRecoilState(imgFileState);
  const [boardData, setBoardData] = useState([]);

  const boardId = useParams().boardId;
  useEffect(() => {
    if (isEdit) {
      const getBoard = async () => {
        const result = await API.get(`/boards/${boardId}`);
        setBoardData(result.data);
      };
      getBoard();
    }
  }, [isEdit]);

  useEffect(() => {
    if (boardData) {
      setTitle(boardData?.title);
      setDescription(boardData?.description);
    }
  }, [boardData]);

  const onChangeInput = e => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'description') {
      setDescription(value);
    }
  };

  const navigate = useNavigate();

  const onClickSubmit = async e => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append('title', title);
      formData.append('description', description);
      formData.append('boardImage', imgFile);
      if (isEdit) {
        await axios.put(`${API.serverUrl}/boards/${boardId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
          },
        });
        setIsScucessModal({
          state: true,
          message: '커뮤니티를 수정하였습니다.',
        });
        navigate(`${ROUTE.BOARDDETAIL.link}/${boardId}`);
      } else {
        if (!title) {
          setIsErrorModal({
            state: true,
            message: '커뮤니티 제목을 입력해주세요.',
          });
        } else if (!description) {
          setIsErrorModal({
            state: true,
            message: '커뮤니티 내용을 입력해주세요.',
          });
        } else {
          const result = await API.formPost('/boards', formData);
          setIsScucessModal({
            state: true,
            message: '커뮤니티를 등록하였습니다.',
          });
          navigate(`${ROUTE.BOARDDETAIL.link}/${result.data._id}`);
        }
      }
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data,
      });
    }
  };

  const onClickCancel = () => {
    if (isEdit) {
      navigate(`${ROUTE.BOARDDETAIL.link}/${boardData?._id}`);
    } else {
      navigate(`${ROUTE.BOARDLIST.link}`);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <S.BoardWriteTitle>커뮤니티 {isEdit ? '수정' : '작성'}</S.BoardWriteTitle>
          <S.BoardWriteForm>
            <S.WritePasswordBox></S.WritePasswordBox>
            <S.DefaultInputBox>
              <p>제목</p>
              <S.DefaultInput
                type="text"
                placeholder="제목을 작성해주세요."
                name="title"
                value={title}
                onChange={onChangeInput}
              />
            </S.DefaultInputBox>
            <S.TextareaBox>
              <p>내용</p>
              <textarea name="description" onChange={onChangeInput} value={description} />
            </S.TextareaBox>
            <S.PhotoClipBox>
              <p>사진 첨부</p>
              <S.PhotoContainer>
                <div style={{ width: '20rem' }}>
                  <FileUpload boardImg={boardData?.boardImage} />
                </div>
              </S.PhotoContainer>
            </S.PhotoClipBox>
            <S.cancleBtnBox>
              <S.FormSubmitBtn type="submit" onClick={onClickSubmit}>
                {isEdit ? '수정' : '등록'}하기
              </S.FormSubmitBtn>
              <S.FormCancleBtn type="button" onClick={onClickCancel}>
                취소하기
              </S.FormCancleBtn>
            </S.cancleBtnBox>
          </S.BoardWriteForm>
        </S.Container>
      </S.Wrapper>
    </>
  );
}
