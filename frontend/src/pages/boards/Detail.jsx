import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as S from './detail.styled';
import * as API from '../../api/index';
import { isErrorModalState, isSuccessModalState, userInfoState } from '../../stores';
import { useRecoilState } from 'recoil';
import { ROUTE } from '../../constants/routes/routeData';

export default function BoardDetail() {
  const [boardData, setBoardData] = useState([]);
  const [comment, setComment] = useState('');
  console.log(comment);

  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);
  const [userInfo] = useRecoilState(userInfoState);

  const boardId = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      const result = await API.get(`/boards/${boardId}`);
      setBoardData(result.data);
    };
    getBoard();
  }, []);

  const onClickDelete = async () => {
    try {
      await API.delete(`/boards/${boardId}`);
      setIsScucessModal({
        state: true,
        message: '커뮤니티를 삭제 하였습니다.',
      });
      navigate(ROUTE.BOARDLIST.link);
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: '커뮤니티 삭제 실패 관리자에게 문의해주세요.',
      });
    }
  };

  const onChangeComment = e => {
    setComment(e.target.value);
  };

  const onClickAddComment = async () => {
    if (comment) {
      try {
        const data = {
          content: comment,
        };
        await API.post(`/comments/${boardId}`, data);
        setIsScucessModal({
          state: true,
          message: '댓글이 등록되었습니다.',
        });
      } catch (err) {
        setIsErrorModal({
          state: true,
          message: err.response.data,
        });
      }
    } else {
      setIsErrorModal({
        state: true,
        message: '댓글을 입력해주세요.',
      });
    }
  };

  const onClickLike = async () => {
    try {
      await API.post(`/boards/${boardId}/like`);
      const updatedBoard = await API.get(`/boards/${boardId}`);
      setBoardData(updatedBoard.data);
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: '이 버튼은 한 번만 누를 수 있습니다.',
      });
    }
  };

  const onClickUnlike = async () => {
    try {
      await API.post(`/boards/${boardId}/unlike`);
      const updatedBoard = await API.get(`/boards/${boardId}`);
      setBoardData(updatedBoard.data);
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: '이 버튼은 한 번만 누를 수 있습니다.',
      });
    }
  };

  return (
    <>
      <S.BoardDetailContainer>
        <S.BoardDetailTitleContainer>
          <S.DetailWriterAndDateBox>
            <S.DetailProfileImg
              img={`${API.imgUrl}${boardData?.user?.profileImg}`}
            ></S.DetailProfileImg>
            <S.DetailTitleAndDate>
              <S.BoardDetailTitle>{boardData?.title}</S.BoardDetailTitle>
              <S.DetailWriterAndDate>
                <S.BoardWriter>{boardData?.user?.name}</S.BoardWriter>
                <S.DetailDate>Date : {boardData?.createdAt}</S.DetailDate>
              </S.DetailWriterAndDate>
            </S.DetailTitleAndDate>
          </S.DetailWriterAndDateBox>
        </S.BoardDetailTitleContainer>
        <S.BoardDetailContentContainer>
          <S.DetailContentBox>
            <img src={`${API.imgUrl}${boardData?.boardImage}`} alt="" />
          </S.DetailContentBox>
          <S.BoardContent>
            <pre>{boardData?.description}</pre>
          </S.BoardContent>
          <S.LikeAndUnLikeBox>
            <S.LikeAndUnLIkeContainer>
              <S.DefaultBtn onClick={onClickLike}>
                <img src="/images/board/likeBtn.png" />
              </S.DefaultBtn>
              <S.LikeText style={{ color: '#FFD600' }}>{boardData?.like}</S.LikeText>
            </S.LikeAndUnLIkeContainer>
            <S.LikeAndUnLIkeContainer>
              <S.DefaultBtn onClick={onClickUnlike}>
                <img src="/images/board/unLikeBtn.png" />
              </S.DefaultBtn>
              <S.LikeText style={{ color: '#828282' }}>{boardData?.unLike}</S.LikeText>
            </S.LikeAndUnLIkeContainer>
          </S.LikeAndUnLikeBox>
        </S.BoardDetailContentContainer>
        <S.BoardBtnContainer>
          <Link to="/boards">
            <S.BoardDefaultBtn>목록으로</S.BoardDefaultBtn>
          </Link>
          {userInfo?.user?._id === boardData?.user?._id && (
            <>
              <S.BoardDefaultBtn
                onClick={() => navigate(`${ROUTE.BOARDEDIT.link}/${boardData?._id}`)}
              >
                수정하기
              </S.BoardDefaultBtn>
              <S.BoardDefaultBtn
                style={{ backgroundColor: '#fff', color: '#01881c', border: '1px solid #01881c' }}
                onClick={onClickDelete}
              >
                삭제하기
              </S.BoardDefaultBtn>
            </>
          )}
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
              onChange={onChangeComment}
            />
            <S.CommentSubmitBox>
              <S.CommentLengthBox>{comment.length}/100</S.CommentLengthBox>
              <S.CommentSubmit onClick={onClickAddComment}>등록하기</S.CommentSubmit>
            </S.CommentSubmitBox>
          </S.CommentTextareaBox>
        </S.CommentContainer>
        <S.CommentErrorText></S.CommentErrorText>
      </S.BoardDetailContainer>
    </>
  );
}
