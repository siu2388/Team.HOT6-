import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getDates } from '../../../commons/utils/getDate';
import FileUpload from '../../commons/FileUpload';
import { res } from '../../../styles/responsive';
import {
  imgFileState,
  isErrorModalState,
  isSuccessModalState,
  userInfoState,
} from '../../../stores';
import { useRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import * as API from '../../../api/index';

export default function AddActiveModal({ onClickToggleModal, selectedDate }) {
  const [activity, setActivity] = useState('');
  const [userInfo] = useRecoilState(userInfoState);
  const [imgFile] = useRecoilState(imgFileState);
  const [, setIsScucessModal] = useRecoilState(isSuccessModalState);
  const [, setIsErrorModal] = useRecoilState(isErrorModalState);

  const groupId = useParams().id;

  const onChangeActivity = e => {
    setActivity(e.target.value);
  };

  const handleAddActivity = async () => {
    try {
      if (!activity) {
        setIsErrorModal({
          state: true,
          message: '카테고리를 선택해주세요.',
        });
      } else if (!imgFile) {
        setIsErrorModal({
          state: true,
          message: '활동 이미지를 등록해주세요.',
        });
      } else {
        const formData = new FormData();
        formData.append('name', userInfo?.user?.name);
        formData.append('groupId', groupId);
        formData.append('usedDate', selectedDate);
        formData.append('category', activity);
        formData.append('proofImg', imgFile);

        await API.formPost('/activities', formData);
        setIsScucessModal({
          state: true,
          message: '인증요청에 성공하였습니다. 인증 완료 후 포인트가 적립됩니다.',
        });
        onClickToggleModal();
      }
    } catch (err) {
      setIsErrorModal({
        state: true,
        message: err.response.data,
      });
    }
  };

  return (
    <BackDrop>
      <Modal>
        <ModalTitle>활동 등록</ModalTitle>
        <ActiveForm>
          <InputBox>
            <TextField
              id="filled-required"
              label="이름"
              variant="standard"
              value={userInfo?.user?.name}
              disabled
            />
          </InputBox>
          <InputBox>
            <TextField
              id="filled-required"
              label="활동날짜"
              variant="standard"
              value={getDates(selectedDate)}
              disabled
            />
          </InputBox>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">실천항목</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="tumbler"
                control={<Radio />}
                label="텀블러"
                onChange={onChangeActivity}
              />
              <FormControlLabel
                value="multipleContainers"
                control={<Radio />}
                label="다회용기"
                onChange={onChangeActivity}
              />
            </RadioGroup>
          </FormControl>
          <FileBox>
            <FileTitle>활동 인증사진</FileTitle>
            <FileUpload />
          </FileBox>
          <BtnBox>
            <Button variant="contained" color="success" onClick={handleAddActivity}>
              등록
            </Button>
            <Button variant="outlined" color="success" onClick={onClickToggleModal}>
              닫기
            </Button>
          </BtnBox>
        </ActiveForm>
      </Modal>
    </BackDrop>
  );
}

const BackDrop = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Modal = styled.div`
  width: 400px;
  padding: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1rem;

  @media ${res.mobile} {
    width: 90%;
  }
`;

const ModalTitle = styled.h3`
  font-size: 2.4rem;
  font-weight: 500;
  color: #01881c;
  margin-bottom: 3rem;
`;

const InputBox = styled.div`
  margin-bottom: 2rem;
`;

const ActiveForm = styled.form`
  width: 100%;
`;

const FileBox = styled.div`
  margin: 2rem 0;
`;

const FileTitle = styled.h5`
  font-size: 1.4rem;
  font-weight: 400;
  color: #0009;
  margin-bottom: 1rem;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
`;
